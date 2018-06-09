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
    // 切换时间
    interval: PropTypes.number,
    // 首次滚动时间
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
    delay: 2000,
    marqueeList: []
  }

  componentDidMount() {
    this.run()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  animate = (interval, height) => {
    this.setState({
      transform: `translate3D(0, ${height}px, 0)`,
      transitionDuration: `${interval}ms`
    })
  }

  run = () => {
    let { marqueeIndex } = this.state
    const { delay, interval, height, marqueeList } = this.props
    this.r = setInterval(() => {
      this.animate(interval, -(marqueeIndex * height))
      ++ marqueeIndex
      this.setState({ marqueeIndex })
        if (marqueeIndex >= marqueeList.length) {
          setTimeout(() => {
            marqueeIndex = 0
            this.setState({ marqueeIndex: 0 })
            this.animate(0, 0)
          }, interval)
        }
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
      position: 'absolute',
      left: 0,
      top: 0,
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
        <div style={animationStyles}>
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
