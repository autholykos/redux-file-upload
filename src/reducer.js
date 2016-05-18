import * as actions from './actions';
import UploadingDocument from './UploadingDocument';
import UploadingImage from './UploadingImage';
import { List, Map, Record } from 'immutable';

const InitialState = Record({
  error: null,
  uploadingDocuments: Map(),
  uploadingImages: Map()
});
const initialState = new InitialState;

function revive() {
  return initialState.merge({
  });
}

export default function fileUploadReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS: {
      const { identificator } = action.meta;

      const newUploadingImages = action.payload.map(
        uploadingImage => new UploadingImage(uploadingImage)
      );

      return state.updateIn(['uploadingImages', identificator], uploadingImages =>
        List(uploadingImages).concat(List(newUploadingImages))
      );
    }

    case actions.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS: {
      const { identificator } = action.meta;

      const newUploadingDocument = action.payload.map(
        uploadingDocument => new UploadingDocument(uploadingDocument)
      );

      return state.updateIn(['uploadingDocuments', identificator], uploadingDocuments =>
        List(uploadingDocuments).concat(List(newUploadingDocument))
      );
    }

    case actions.FILE_UPLOAD_PROGRESS: {
      const { identificator, file, fileType, progress } = action.payload;

      switch (fileType) {
        case 'image': {
          return updateUploadingImage(state, identificator, file, uploadingImage =>
            uploadingImage.set('progress', Math.round(progress))
          );
        }
        case 'document': {
          return updateUploadingDocument(state, identificator, file, uploadingDocument =>
            uploadingDocument.set('progress', Math.round(progress))
          );
        }
      }
      return state;
    }

    case actions.FILE_UPLOAD_FILE_ERROR: {
      const { identificator, file, fileType, error } = action.payload;
      switch (fileType) {
        case 'image': {
          return updateUploadingImage(state, identificator, file, uploadingImage =>
            uploadingImage.set('error', error)
          );
        }
        case 'document': {
          return updateUploadingDocument(state, identificator, file, uploadingDocument =>
            uploadingDocument.set('error', error)
          );
        }
      }
      return state;
    }

  }

  return state;
}

function updateUploadingImage(state, identificator, file, updater) {
  return state.updateIn(['uploadingImages', identificator], uploadingImages =>
    List(uploadingImages).map(uploadingImage => // eslint-disable-line no-confusing-arrow
      uploadingImage.file === file
        ? updater(uploadingImage)
        : uploadingImage
    )
  );
}

function updateUploadingDocument(state, identificator, file, updater) {
  return state.updateIn(['uploadingDocuments', identificator], uploadingDocuments =>
    List(uploadingDocuments).map(uploadingDocument => // eslint-disable-line no-confusing-arrow
      uploadingDocument.file === file
        ? updater(uploadingDocument)
        : uploadingDocument
    )
  );
}