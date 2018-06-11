import React from 'react'
import PropTypes from 'prop-types'

export default class Marquee extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      marqueeIndex: 0,
      animation: {
        transform: '',
        transitionDuration: ''
      }
    }
  }

  static PropTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    // 动画效果时间
    interval: PropTypes.number,
    // 切换时间
    delay: PropTypes.number,
    // 文字列表
    marqueeList: PropTypes.array.isRequired
  }

  static defaultProps = {
    width: 200,
    height: 50,
    backgroundColor: '#fffff',
    color: '#000',
    fontSize: 13,
    interval: 500,
    delay: 1500,
    marqueeList: []
  }

  componentDidMount() {
    this.on(this.item, 'webkitTransitionEnd', this.transitionEnd)
    this.on(this.item, 'transitionend', this.transitionEnd)
    this.startAnimation()
  }

  componentWillUnmount() {
    this.off(this.item, 'webkitTransitionEnd', this.transitionEnd)
    this.off(this.item, 'transitionend', this.transitionEnd)
    if (this._marqueeTimer) {
      clearInterval(this._marqueeTimer)
      this._marqueeTimer = null
    }
  }

  on = (el, type, callback) => {
    if (el.addEventListener) {
      el.addEventListener(type, callback)
    } else {
      el.attachEvent(`on ${type}`, () => {
        callback.call(el)
      })
    }
  }

  off = (el, type, callback) => {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback)
    } else {
      el.detachEvent(`off ${type}`, callback)
    }
  }

  transitionEnd = () => {
    const { marqueeList } = this.props
    let { marqueeIndex } = this.state
    if (marqueeIndex === marqueeList.length ) {
      this.animate(0, 0, 0)
    }
  }

  animate = (index, interval, height) => {
    let y = -(index * height)
    this.item.style.transitionDuration = `${interval}ms`
    this.item.style.transform = `translate3D(0, ${y}px, 0)`
    this.setState({ marqueeIndex: index })
  }

  startAnimation = () => {
    this.run()
  }

  stopAnimation = () => {
    if (this._marqueeTimer) {
      clearInterval(this._marqueeTimer)
      this._marqueeTimer = null
    }
  }

  run = () => {
    const { delay, interval, height, marqueeList } = this.props
    this._marqueeTimer = setInterval(() => {
      let { marqueeIndex } = this.state
      marqueeIndex += 1
      if (marqueeIndex > marqueeList.length) {
        marqueeIndex = 0
      }
      this.animate(marqueeIndex, interval, height)
    }, delay)
  }

  render() {
    const { transform, transitionDuration } = this.state
    const { marqueeList, width, height, backgroundColor, color, fontSize } = this.props

    const wrapStyles = {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: `${backgroundColor}`,
      width: `${width}px`,
      height: `${height}px`
    }
    const animationStyles = {
      transform: `${transform}`,
      transitionDuration: `${transitionDuration}`
    }
    const itemStyles = {
      height: `${height}px`,
      lineHeight: `${height}px`,
      color: `${color}`,
      fontSize: `${fontSize}px`,
      overflow: 'hidden'
    }

    return (
      <div style={wrapStyles}>
        <div style={animationStyles} ref={(el) => { this.item = el }}>
          {
            marqueeList.map((item, index) => {
              return (
                <div style={itemStyles} key={index}>
                  {item}  
                </div>
              )
            })
          }
          {
            <div style={itemStyles}>
              {marqueeList[0]}
            </div>
          }
        </div>
      </div>
    )
  }
}
