import React, { Component } from 'react'
import router from 'umi/router'
import styles from './style.less'


class Home extends Component {
  componentWillMount() {
    router.push('/resource-library/school-library')
  }

  render() {
    return (
      <div>
        <div className={styles.title}>配置</div>
      </div>
    )
  }
}

export default Home
