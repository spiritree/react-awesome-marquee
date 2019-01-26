import * as React from 'react'

export interface MarqueeProps {
  width: number
  height: number
  backgroundColor: string
  fontSize: number
  interval: number
  delay: number
  count: number
}
export interface MarqueeState {
  marqueeIndex: number
  transform: string
  transitionDuration: string
}

export default class Marquee extends React.Component<
  MarqueeProps,
  MarqueeState
> {
  constructor(props: MarqueeProps) {
    super(props)
    this.state = {
      marqueeIndex: 0,
      transform: '',
      transitionDuration: ''
    }
  }

  public static defaultProps = {
    width: 200,
    height: 50,
    backgroundColor: '#fffff',
    fontSize: 13,
    interval: 500,
    delay: 1500
  }

  componentDidMount() {
    this.marqueeItem &&
      this.marqueeItem.addEventListener('transitionend', this.transitionEnd)
    this.startAnimation()
  }

  componentWillUnmount() {
    this.marqueeItem &&
      this.marqueeItem.removeEventListener('transitionend', this.transitionEnd)
    if (this._marqueeTimer) {
      clearInterval(this._marqueeTimer)
      this._marqueeTimer = null
    }
  }

  transitionEnd = () => {
    const { count } = this.props
    let { marqueeIndex } = this.state
    if (marqueeIndex === count) {
      this.animate(0, 0, 0)
    }
  }

  animate = (index: number, interval: number, height: number) => {
    let y = -(index * height)
    this.marqueeItem.style.transitionDuration = `${interval}ms`
    this.marqueeItem.style.transform = `translate3D(0, ${y}px, 0)`
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
    const { delay, interval, height, count } = this.props
    this._marqueeTimer = setInterval(() => {
      let { marqueeIndex } = this.state
      marqueeIndex += 1
      if (marqueeIndex > count) {
        marqueeIndex = 0
      }
      this.animate(marqueeIndex, interval, height)
    }, delay)
  }

  render() {
    const { transform, transitionDuration } = this.state
    const { width, height, backgroundColor, children } = this.props

    const wrapStyles: React.CSSProperties = {
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

    return (
      <div style={wrapStyles}>
        <div
          style={animationStyles}
          ref={el => {
            this.marqueeItem = el
          }}
        >
          {children}
          {children[0]}
        </div>
      </div>
    )
  }
}
