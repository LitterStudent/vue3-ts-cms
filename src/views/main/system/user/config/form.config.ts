import { IForm } from '@/base-ui/from/type'
export const formconfig: IForm = {
  labelWidth: 100,
  itemStyle: {
    padding: '20px 20px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'id',
      type: 'input',
      label: 'ID',
      placeholder: '请输入ID'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请输入用户状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 }
      ]
    },
    {
      field: 'createAt',
      type: 'dateselect',
      label: '时间范围',
      placeholder: '请输入时间范围'
    }
  ]
}
