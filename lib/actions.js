'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FILE_UPLOAD_PROGRESS = exports.FILE_UPLOAD_MULTIPLE_FILE_UPLOAD = exports.FILE_UPLOAD_COMPLETE = exports.FILE_UPLOAD_ERROR = exports.FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS = exports.FILE_UPLOAD_ADD_UPLOADING_IMAGES = exports.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS = exports.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS = exports.THUMBNAIL_HEIGHT = exports.THUMBNAIL_WIDTH = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.addUploadingImages = addUploadingImages;
exports.addUploadingDocs = addUploadingDocs;
exports.uploadFiles = uploadFiles;
exports.fileProgress = fileProgress;
exports.fileComplete = fileComplete;

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileAPI = require('fileapi');

var THUMBNAIL_WIDTH = exports.THUMBNAIL_WIDTH = 200;
var THUMBNAIL_HEIGHT = exports.THUMBNAIL_HEIGHT = 200;

var FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS = exports.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS = 'FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS';
var FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS = exports.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS = 'FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS';
var FILE_UPLOAD_ADD_UPLOADING_IMAGES = exports.FILE_UPLOAD_ADD_UPLOADING_IMAGES = 'FILE_UPLOAD_ADD_UPLOADING_IMAGES';
var FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS = exports.FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS = 'FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS';
var FILE_UPLOAD_ERROR = exports.FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
var FILE_UPLOAD_COMPLETE = exports.FILE_UPLOAD_COMPLETE = 'FILE_UPLOAD_COMPLETE';
var FILE_UPLOAD_MULTIPLE_FILE_UPLOAD = exports.FILE_UPLOAD_MULTIPLE_FILE_UPLOAD = 'FILE_UPLOAD_MULTIPLE_FILE_UPLOAD';
var FILE_UPLOAD_PROGRESS = exports.FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';

function getThumbnails(imageFiles) {
  return _promise2.default.all(imageFiles.map(getImageThumbnail));
}

function getImageThumbnail(imageFile) {
  return new _promise2.default(function (resolve, reject) {
    FileAPI.Image(imageFile).preview(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).get(function (err, canvas) {
      if (err) reject(err);

      resolve({
        dataURL: canvas.toDataURL(),
        file: imageFile
      });
    });
  });
}

function uploadFile(dispatch, url, identificator, file, data, fileAPIOptions) {
  return new _promise2.default(function (complete) {
    FileAPI.upload((0, _extends3.default)({}, fileAPIOptions, {
      data: data,
      complete: complete,
      files: {
        file: file
      },
      fileprogress: function fileprogress() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return dispatch(fileProgress.apply(undefined, [identificator].concat(args)));
      },
      filecomplete: function filecomplete() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return dispatch(fileComplete.apply(undefined, [identificator].concat(args)));
      },
      url: url
    }));
  });
}

function addUploadingImages(identificator, imageFiles) {
  return {
    type: FILE_UPLOAD_ADD_UPLOADING_IMAGES,
    payload: {
      promise: getThumbnails(imageFiles)
    },
    meta: {
      identificator: identificator
    }
  };
}

function addUploadingDocs(identificator, docFiles) {
  var documentPromise = _promise2.default.all(docFiles);

  return {
    type: FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS,
    payload: {
      promise: documentPromise
    },
    meta: {
      identificator: identificator
    }
  };
}

function uploadFiles(identificator, url, files, type, data, fileAPIOptions) {
  return function (params) {
    var dispatch = typeof params === 'function' ? params : params.dispatch;
    var allFilePromises = files.map(function (file) {
      return uploadFile(dispatch, url, identificator, file, data, fileAPIOptions);
    });

    return {
      type: FILE_UPLOAD_MULTIPLE_FILE_UPLOAD,
      payload: {
        promise: _promise2.default.all(allFilePromises)
      }
    };
  };
}

function fileProgress(identificator, event, file, fileType) {
  var progress = event.loaded / event.total * 100;

  return {
    type: FILE_UPLOAD_PROGRESS,
    payload: { identificator: identificator, file: file, fileType: fileType, progress: progress, isImage: (0, _helpers.isImage)(file), isDoc: (0, _helpers.isDoc)(file) }
  };
}

function fileComplete(identificator, error, xhr, file) {
  if (error) return {
    type: FILE_UPLOAD_ERROR,
    payload: { identificator: identificator, file: file, error: error, isImage: (0, _helpers.isImage)(file), isDoc: (0, _helpers.isDoc)(file) }
  };

  var response = JSON.parse(xhr.response);
  var photo = response.photo;


  return {
    type: FILE_UPLOAD_COMPLETE,
    payload: { identificator: identificator, file: file, photo: photo, response: response }
  };
}