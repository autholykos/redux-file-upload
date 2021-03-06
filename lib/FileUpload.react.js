'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2, _class3, _temp2;

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _autobind = require('core-decorators/lib/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _helpers = require('./helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var FileAPI = require('fileapi');

var FileUpload = (_dec = (0, _reactRedux.connect)(null, actions), _dec(_class = (0, _radium2.default)(_class = (_class2 = (_temp2 = _class3 = function (_Component) {
  (0, _inherits3.default)(FileUpload, _Component);

  function FileUpload() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FileUpload);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FileUpload.__proto__ || (0, _getPrototypeOf2.default)(FileUpload)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dragCount: 0
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FileUpload, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      FileAPI.event.on(this.refs.fileInput, 'change', this.handleFileChange);
      FileAPI.event.dnd(this.refs.fileInput, this.handleDragHover, this.handleFileChange);
      document.addEventListener('drop', this.preventDropEvent);
      document.addEventListener('dragover', this.preventDragOverEvent);
      document.addEventListener('dragenter', this.handleDocumentDragEnter);
      document.addEventListener('dragleave', this.handleDocumentDragLeave);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      FileAPI.event.off(this.refs.fileInput, 'change', this.handleFileChange);
      FileAPI.event.dnd.off(this.refs.fileInput, this.handleDragHover, this.handleFileChange);
      document.removeEventListener('drop', this.preventDropEvent);
      document.removeEventListener('dragover', this.preventDragOverEvent);
      document.removeEventListener('dragenter', this.handleDocumentDragEnter);
      document.removeEventListener('dragleave', this.handleDocumentDragLeave);
    }
  }, {
    key: 'handleDragHover',
    value: function handleDragHover(over) {
      this.setState({ dropzoneHover: over });
    }
  }, {
    key: 'handleDocumentDragEnter',
    value: function handleDocumentDragEnter() {
      var dragCount = this.state.dragCount;


      if (dragCount === 0) this.setState({ dropzoneActive: true });
      this.setState({ dragCount: dragCount + 1 });
    }
  }, {
    key: 'handleDocumentDragLeave',
    value: function handleDocumentDragLeave(event) {
      var dragCount = this.state.dragCount;


      event.preventDefault();
      if (dragCount === 1) this.setState({ dropzoneActive: false });
      this.setState({ dragCount: dragCount - 1 });
    }
  }, {
    key: 'handleFileChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event) {
        var _props, addUploadingDocs, addUploadingImages, allowedFileTypes, data, dropzoneId, identifier, uploadFiles, url, fileAPIOptions, dragCount, allowedFiles, imageFiles, docFiles, id;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _props = this.props, addUploadingDocs = _props.addUploadingDocs, addUploadingImages = _props.addUploadingImages, allowedFileTypes = _props.allowedFileTypes, data = _props.data, dropzoneId = _props.dropzoneId, identifier = _props.identifier, uploadFiles = _props.uploadFiles, url = _props.url, fileAPIOptions = _props.fileAPIOptions;
                dragCount = this.state.dragCount;


                if (dragCount === 1) this.setState({ dropzoneActive: false, dragCount: dragCount - 1 });

                if (!allowedFileTypes) {
                  _context.next = 9;
                  break;
                }

                _context.next = 6;
                return (0, _helpers.filterAllowedFiles)(event, allowedFileTypes);

              case 6:
                _context.t0 = _context.sent;
                _context.next = 10;
                break;

              case 9:
                _context.t0 = event;

              case 10:
                allowedFiles = _context.t0;
                _context.next = 13;
                return (0, _helpers.filterImageFiles)(allowedFiles);

              case 13:
                imageFiles = _context.sent;
                _context.next = 16;
                return (0, _helpers.filterDocFiles)(allowedFiles);

              case 16:
                docFiles = _context.sent;
                id = identifier || dropzoneId;


                if (!!imageFiles.length) {
                  addUploadingImages(id, imageFiles);
                  uploadFiles(id, url, imageFiles, 'image', data, fileAPIOptions);
                }
                if (!!docFiles.length) {
                  addUploadingDocs(id, docFiles);
                  uploadFiles(id, url, docFiles, 'document', data, fileAPIOptions);
                }

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleFileChange(_x) {
        return _ref2.apply(this, arguments);
      }

      return handleFileChange;
    }()
  }, {
    key: 'preventDropEvent',
    value: function preventDropEvent(event) {
      var dropzoneId = this.props.dropzoneId;

      if (event.target.id !== dropzoneId) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'none'; // eslint-disable-line no-param-reassign
      }
    }
  }, {
    key: 'preventDragOverEvent',
    value: function preventDragOverEvent(event) {
      var dropzoneId = this.props.dropzoneId;

      if (event.target.id !== dropzoneId) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'none'; // eslint-disable-line no-param-reassign
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          className = _props2.className,
          dropzoneActiveStyle = _props2.dropzoneActiveStyle,
          dropzoneId = _props2.dropzoneId,
          dropzoneStyle = _props2.dropzoneStyle,
          multiple = _props2.multiple;
      var dropzoneActive = this.state.dropzoneActive;


      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'form',
          { ref: 'fileUpload' },
          _react2.default.createElement(
            'label',
            { style: [dropzoneStyle || styles.dropzone.base, dropzoneActive && (dropzoneActiveStyle || styles.dropzone.active)] },
            _react2.default.createElement('input', {
              id: dropzoneId,
              multiple: multiple,
              ref: 'fileInput',
              style: styles.input,
              type: 'file'
            }),
            children
          )
        )
      );
    }
  }]);
  return FileUpload;
}(_component2.default), _class3.propTypes = {
  allowedFileTypes: _react.PropTypes.array,
  children: _react.PropTypes.element,
  className: _react.PropTypes.string,
  data: _react.PropTypes.object,
  addUploadingDocs: _react.PropTypes.func.isRequired,
  addUploadingImages: _react.PropTypes.func.isRequired,
  uploadFiles: _react.PropTypes.func.isRequired,
  dropzoneActiveStyle: _react.PropTypes.object,
  dropzoneId: _react.PropTypes.string.isRequired,
  dropzoneStyle: _react.PropTypes.object,
  identifier: _react.PropTypes.string,
  multiple: _react.PropTypes.bool,
  url: _react.PropTypes.string.isRequired,
  fileAPIOptions: _react.PropTypes.object
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleDragHover', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleDragHover'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleDocumentDragEnter', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleDocumentDragEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleDocumentDragLeave', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleDocumentDragLeave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFileChange', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleFileChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'preventDropEvent', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'preventDropEvent'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'preventDragOverEvent', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'preventDragOverEvent'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = FileUpload;


var styles = {
  dropzone: {
    base: {
      backgroundColor: 'white',
      display: 'block',
      position: 'relative',
      textAlign: 'center'
    },
    active: {
      border: '1px solid grey'
    }
  },

  input: {
    bottom: 0,
    cursor: 'pointer',
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 1
  }
};
module.exports = exports['default'];