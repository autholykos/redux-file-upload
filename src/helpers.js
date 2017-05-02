import {filterFiles, getFiles} from 'fileapi'

const IMAGE_TYPES = /^image\/(jpe?g|png|gif|jf?if|tiff?)$/i;

export function isImage(file) {
  return IMAGE_TYPES.test(file.type);
}

export function isDoc(file) {
  return !isImage(file);
}

export function filterImageFiles(payload) {
  return new Promise(resolve => {
    if (payload instanceof Event) getFiles(payload, isImage, resolve);
    else filterFiles(payload, isImage, resolve);
  });
}

export function filterDocFiles(payload) {
  return new Promise(resolve => {
    if (payload instanceof Event) getFiles(payload, isDoc, resolve);
    else filterFiles(payload, isDoc, resolve);
  });
}

export function filterAllowedFiles(payload, allowedFileTypes) {
  const allowedFilter = new RegExp(`${allowedFileTypes.join('|')}$`, 'i');

  return new Promise(resolve => {
    if (payload instanceof Event) getFiles(payload, file => allowedFilter.test(file.type), resolve);
    else filterFiles(payload, file => allowedFilter.test(file.type), resolve);
  });
}
