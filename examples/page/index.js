import React from 'react'
import Marquee from '../../src/index.js'

const List = [
  'marquee test1',
  'marquee test2',
  'marquee test3'
]

export default class PageContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Marquee
        fontSize={40}
        color='#fff'
        backgroundColor='#f99'
        width={300}
        height={22}
        interval={500}
        delay={1000}
        count={3}
      >
        {
          List.map((item, index) => {
            return (
              <div key={index}>{item}</div>
            )
          })
        }
      </Marquee>
    )
  }
}
