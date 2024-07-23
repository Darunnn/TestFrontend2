import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Radio, Button, Table, Checkbox, DatePicker, Select, Row, Col } from 'antd';
import { addPerson, updatePerson, deletePerson, deleteMultiplePersons } from './store/personSlice';
import { useTranslation } from 'react-i18next';
import { RootState } from './store';
import { FlagOutlined } from '@ant-design/icons';

const { Option } = Select;
interface CitizenIdParts {
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  part5: string;
}
interface Person {
  id: number;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: 'American' | 'Canadian' | 'British';
  citizenId: CitizenIdParts;
  gender: 'Male' | 'Female' | 'Unisex';
  mobilePhone: string;
  passportNo: string;
  expectedSalary: number;
}

const App: React.FC = () => {
  const [form] = Form.useForm<Person>();
  const persons = useSelector((state: RootState) => state.person.persons);
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [countryCode, setCountryCode] = useState('+66');
  const { t, i18n } = useTranslation();
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const onFinish = (values: Omit<Person, 'id'> & { citizenId: CitizenIdParts }) => {
    const personData: Person = {
      ...values,
      id: editingPerson ? editingPerson.id : Date.now(),
      expectedSalary: Number(values.expectedSalary),
      mobilePhone: `${countryCode}${values.mobilePhone}`,
      citizenId: values.citizenId 
    };

    if (editingPerson) {
      dispatch(updatePerson(personData)); 
    } else {
      dispatch(addPerson(personData)); 
    }
    form.resetFields();
    setEditingPerson(null);
  };


  const columns = [
    {
      title: t('name'),
      dataIndex: 'firstname',
      key: 'name',
      render: (_: any, record: Person) => `${record.firstname} ${record.lastname}`,
      sorter: (a: Person, b: Person) => `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`),
    },
    {
      title: t('gender'),
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string | undefined) => gender ? t(gender.toLowerCase()) : '',
    },
    {
      title: t('mobilePhone'),
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
      render: (_: any, record: Person) => `${record.mobilePhone} `,
    },
    {
      title: t('nationality'),
      dataIndex: 'nationality',
      key: 'nationality',
      render: (nationality: string | undefined) => nationality ? t(nationality.toLowerCase()) : '',
    },
    {
      title: t('manage'),
      key: 'action',
      render: (_: any, record: Person) => (
        <span>
          <Button onClick={() => handleEdit(record)}>{t('edit')}</Button>
          <Button onClick={() => handleDelete(record.id)} danger>{t('delete')}</Button>
        </span>
      ),
    },
  ];

  const handleEdit = (record: Person) => {
    const countryCode = record.mobilePhone.slice(0, 3);
    const phoneNumber = record.mobilePhone.slice(3);
    form.setFieldsValue({
      ...record,
      mobilePhone: phoneNumber,
      citizenId: record.citizenId
    });
    setCountryCode(countryCode);
    setEditingPerson(record);
  };

  const handleDelete = (id: number) => {
    dispatch(deletePerson(id));
  };

  const handleDeleteMultiple = () => {
    dispatch(deleteMultiplePersons(selectedRows));
    setSelectedRows([]);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRows(selectedRowKeys as number[]);
    },
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const countryOptions = [
    { code: "+66", icon: <FlagOutlined style={{ fontSize: '1.2em' }} /> },
    { code: "+1", icon: <FlagOutlined style={{ fontSize: '1.2em' }} /> },
    { code: "+44", icon: <FlagOutlined style={{ fontSize: '1.2em' }} /> },
  ];

  return (
    <div style={{ padding: '20px', background: 'linear-gradient(to right, #4CAF50, #FFC107)', minHeight: '100vh' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <h1 style={{ color: 'white' }}>{t('formAndTable')}</h1>
        </Col>
        <Col>
          <Select defaultValue="en" style={{ width: 120 }} onChange={changeLanguage}>
            <Option value="en">English</Option>
            <Option value="th">ไทย</Option>
          </Select>
        </Col>
      </Row>

      <Form<Person> form={form} onFinish={onFinish} layout="vertical" style={{ background: 'transparent', padding: '20px', borderRadius: '8px', margin: 'auto', marginBottom: '20px', border: '1px solid', width: '80%' }}>
        <Row gutter={16}>
          <Col span={3}>
            <Form.Item name="title" label={t('title')} rules={[{ required: true }]}>
              <Select>
                <Option value="Mr.">Mr.</Option>
                <Option value="Ms.">Ms.</Option>
                <Option value="Mrs.">Mrs.</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="firstname" label={t('firstname')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="lastname" label={t('lastname')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item name="birthday" label={t('birthday')} rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="nationality" label={t('nationality')} rules={[{ required: true }]}>
              <Select placeholder={t('selectNationality')}>
                <Option value="american">{t('american')}</Option>
                <Option value="canadian">{t('canadian')}</Option>
                <Option value="british">{t('british')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="citizenId" label={t('citizenId')} >
          <Form.Item name={['citizenId', 'part1']} noStyle>
            <Input
              id='input1'
              style={{ width: '5%', marginRight: '10px', textAlign: 'center' }}
              maxLength={1}
              onChange={(e) => {
                if (e.target.value.length === 1) {
                  (document.getElementById('input2') as HTMLInputElement)?.focus();
                }
              }}
            />-
          </Form.Item>
          <Form.Item name={['citizenId', 'part2']} noStyle>
            <Input
              id='input2'
              style={{ width: '15%', marginInline: '10px', textAlign: 'center' }}
              maxLength={4}
              onChange={(e) => {
                if (e.target.value.length === 4) {
                  (document.getElementById('input3') as HTMLInputElement)?.focus();
                }
              }}
            />-
          </Form.Item>
          <Form.Item name={['citizenId', 'part3']} noStyle>
            <Input
              id='input3'
              style={{ width: '15%', marginInline: '10px', textAlign: 'center' }}
              maxLength={5}
              onChange={(e) => {
                if (e.target.value.length === 5) {
                  (document.getElementById('input4') as HTMLInputElement)?.focus();
                }
              }}
            />
          </Form.Item>
          <Form.Item name={['citizenId', 'part4']} noStyle>
            <Input
              id='input4'
              style={{ width: '10%', marginInline: '10px', textAlign: 'center' }}
              maxLength={2}
              onChange={(e) => {
                if (e.target.value.length === 2) {
                  (document.getElementById('input5') as HTMLInputElement)?.focus();
                }
              }}
            />
          </Form.Item>
          <Form.Item name={['citizenId', 'part5']} noStyle>
            <Input
              id='input5'
              style={{ width: '5%', marginInline: '10px', textAlign: 'center' }}
              maxLength={1}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item name="gender" label={t('gender')} rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="Male">{t('male')}</Radio>
            <Radio value="Female">{t('female')}</Radio>
            <Radio value="Unisex">{t('unisex')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('mobilePhone')} rules={[{ required: true }]}>
          <Input.Group compact>
            <Select defaultValue={countryCode} onChange={setCountryCode} style={{ width: '10%', marginRight: '10px' }}>
              {countryOptions.map(({ code, icon }) => (
                <Option key={code} value={code}>
                  {code}
                </Option>
              ))}
            </Select>-
            <Form.Item name="mobilePhone" noStyle>
              <Input style={{ width: '40%', marginInline: '10px' }} />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="passportNo" label={t('passportNo')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="expectedSalary" label={t('expectedSalary')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button style={{ margin: '10px' }} type="default" onClick={() => form.resetFields()}>{t('reset')}</Button>
          <Button style={{ margin: '10px' }} type="primary" htmlType="submit">
            {editingPerson ? t('update') : t('submit')}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginBottom: '20px' }}>
        <Checkbox
          indeterminate={selectedRows.length > 0 && selectedRows.length < persons.length}
          checked={selectedRows.length === persons.length}
          onChange={(e) => setSelectedRows(e.target.checked ? persons.map(p => p.id) : [])}
        >
          {t('selectAll')}
        </Checkbox>
        <Button danger onClick={handleDeleteMultiple} disabled={selectedRows.length === 0}>
          {t('delete')}
        </Button>
      </div>

      <Table<Person>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={persons as Person[]}
        rowKey="id"
        style={{ background: 'white' }}
        pagination={{
          total: persons.length,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => t('totalItems', { total }),
        }}
      />
    </div>
  );
};

export default App;

