import { Button, Flex, Form, GetProp, Input, Upload, UploadProps } from 'antd';
import { useResumeStore } from '../resume/store';
import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export function BasicEditor() {
  const {
    name,
    setName,
    profilePicture,
    setProfilePicture,
    title,
    setTitle,
    introduction,
    setIntroduction
  } = useResumeStore();
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: FileType) => {
    setLoading(true);
    getBase64(file, (url) => {
      setLoading(false);
      setProfilePicture(url);
    });
    return false;
  };


  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Form.Item label="姓名">
        <Input value={name} onChange={e => setName(e.target.value)} allowClear  style={{ width: '8em' }} />
      </Form.Item>
      <Form.Item label="职位">
        <Input value={title} onChange={e => setTitle(e.target.value)} allowClear  style={{ width: '20em' }} />
      </Form.Item>
      <Form.Item label="照片">
        <Flex gap={8}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {profilePicture ? <img src={profilePicture} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : uploadButton}
          </Upload>
          { profilePicture ? <Button onClick={() => setProfilePicture('')} icon={<DeleteOutlined />} ></Button> : '' }
        </Flex>
      </Form.Item>
      <Form.Item label="简介">
        <TextArea value={introduction} autoSize={{ minRows: 2 }} placeholder="个人简介" allowClear onChange={e => setIntroduction(e.target.value)} />
        <p style={{ margin: 0, color: '#999', textAlign: 'right' }}>多行文本均支持 <a href='https://en.wikipedia.org/wiki/Markdown' target='_blank'>markdown</a> 语法</p>
      </Form.Item>
    </>
  )
}