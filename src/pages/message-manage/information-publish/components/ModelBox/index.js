import React, { useState } from 'react'
import {Table} from 'antd'

const columns = [
  {
    title: '院校中文名',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
  },
  {
    title: '院校英文名',
    dataIndex: 'nameEn',
    key: 'nameEn',
    ellipsis: true,
  },
  {
    title: '所属国家',
    dataIndex: 'countryId',
    key: 'countryId',
  //   ellipsis: true,
  //   render: (countryId) => {
  //     const { countryListJson } = this.props
  //     return countryListJson[countryId] && countryListJson[countryId].countryName
  //   },
  },
]

export default ({listData,pagination,getInitialData,resourceChange,initData=''}) =>{
  const [selectedRowKeys,setSelectedRowKeys] = useState([initData])

  const  onSelectChange = (selectedRowKeys,selectedRowData) => {
    setSelectedRowKeys(selectedRowKeys)
    resourceChange({resource:selectedRowData[0].name,resourceId:selectedRowKeys[0]})
  }
  const tableChange = ({ current, pageSize }) => {
    getInitialData({ pageNumber: current, pageSize })
  }
    return <Table
    rowKey="id"
    size='small'
    dataSource={listData}
    pagination={pagination}
    columns={columns}
    rowSelection={{
      type:'radio',
      selectedRowKeys,
      onChange: onSelectChange
    }}
    filterMultiple={false}
    onChange={tableChange}
  />
}