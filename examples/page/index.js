import React from 'react'
import classNames from 'classnames'
import Marquee from '../../src'

const List = [
  'marquee test1',
  'marquee test2',
  'marquee test3',
  'marquee test4',
  'marquee test5'
]

export default class PageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Marquee 
        marqueeList={List}
        fontSize={40}
        color='#fff'
        backgroundColor='#f99'
        width={300}
      />
    )
  }
}
