'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Marquee = function (_React$Component) {
  _inherits(Marquee, _React$Component);

  function Marquee(props) {
    _classCallCheck(this, Marquee);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.on = function (el, type, callback) {
      if (el.addEventListener) {
        el.addEventListener(type, callback);
      } else {
        el.attachEvent('on ' + type, function () {
          callback.call(el);
        });
      }
    };

    _this.off = function (el, type, callback) {
      if (el.removeEventListener) {
        el.removeEventListener(type, callback);
      } else {
        el.detachEvent('off ' + type, callback);
      }
    };

    _this.transitionEnd = function () {
      var marqueeList = _this.props.marqueeList;
      var marqueeIndex = _this.state.marqueeIndex;

      if (marqueeIndex === marqueeList.length) {
        _this.animate(0, 0, 0);
      }
    };

    _this.animate = function (index, interval, height) {
      var y = -(index * height);
      _this.item.style.transitionDuration = interval + 'ms';
      _this.item.style.transform = 'translate3D(0, ' + y + 'px, 0)';
      _this.setState({ marqueeIndex: index });
    };

    _this.startAnimation = function () {
      _this.run();
    };

    _this.stopAnimation = function () {
      if (_this._marqueeTimer) {
        clearInterval(_this._marqueeTimer);
        _this._marqueeTimer = null;
      }
    };

    _this.run = function () {
      var _this$props = _this.props,
          delay = _this$props.delay,
          interval = _this$props.interval,
          height = _this$props.height,
          marqueeList = _this$props.marqueeList;

      _this._marqueeTimer = setInterval(function () {
        var marqueeIndex = _this.state.marqueeIndex;

        marqueeIndex += 1;
        if (marqueeIndex > marqueeList.length) {
          marqueeIndex = 0;
        }
        _this.animate(marqueeIndex, interval, height);
      }, delay);
    };

    _this.state = {
      marqueeIndex: 0,
      animation: {
        transform: '',
        transitionDuration: ''
      }
    };
    return _this;
  }

  Marquee.prototype.componentDidMount = function componentDidMount() {
    this.on(this.item, 'webkitTransitionEnd', this.transitionEnd);
    this.on(this.item, 'transitionend', this.transitionEnd);
    this.startAnimation();
  };

  Marquee.prototype.componentWillUnmount = function componentWillUnmount() {
    this.off(this.item, 'webkitTransitionEnd', this.transitionEnd);
    this.off(this.item, 'transitionend', this.transitionEnd);
    if (this._marqueeTimer) {
      clearInterval(this._marqueeTimer);
      this._marqueeTimer = null;
    }
  };

  Marquee.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state,
        transform = _state.transform,
        transitionDuration = _state.transitionDuration;
    var _props = this.props,
        marqueeList = _props.marqueeList,
        width = _props.width,
        height = _props.height,
        backgroundColor = _props.backgroundColor,
        color = _props.color,
        fontSize = _props.fontSize;


    var wrapStyles = {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '' + backgroundColor,
      width: width + 'px',
      height: height + 'px'
    };
    var animationStyles = {
      transform: '' + transform,
      transitionDuration: '' + transitionDuration
    };
    var itemStyles = {
      height: height + 'px',
      lineHeight: height + 'px',
      color: '' + color,
      fontSize: fontSize + 'px',
      overflow: 'hidden'
    };

    return _react2.default.createElement(
      'div',
      { style: wrapStyles },
      _react2.default.createElement(
        'div',
        { style: animationStyles, ref: function ref(el) {
            _this2.item = el;
          } },
        marqueeList.map(function (item, index) {
          return _react2.default.createElement(
            'div',
            { style: itemStyles, key: index },
            item
          );
        }),
        _react2.default.createElement(
          'div',
          { style: itemStyles },
          marqueeList[0]
        )
      )
    );
  };

  return Marquee;
}(_react2.default.Component);

Marquee.PropTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  backgroundColor: _propTypes2.default.string,
  color: _propTypes2.default.string,
  fontSize: _propTypes2.default.number,
  // 动画效果时间
  interval: _propTypes2.default.number,
  // 切换时间
  delay: _propTypes2.default.number,
  // 文字列表
  marqueeList: _propTypes2.default.array.isRequired
};
Marquee.defaultProps = {
  width: 200,
  height: 50,
  backgroundColor: '#fffff',
  color: '#000',
  fontSize: 13,
  interval: 500,
  delay: 1500,
  marqueeList: []
};
exports.default = Marquee;