import { useEffect, useRef, useState } from 'react';
import { FilterOptions, TemplateOptions, templateRegistry } from './register';
import { Flex, Form, Pagination, Radio, Tooltip } from 'antd';
import { useResumeStore } from '../resume/store';
import styles from './market.module.css';
import { TemplatePreview } from '../preview/TemplatePreview';
import { useTemplateStore } from '../resume/template';
import { useNavigate } from 'react-router-dom';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { QuestionCircleTwoTone } from '@ant-design/icons';

const marginOptions: CheckboxGroupProps<string>['options'] = [
  { label: '全部', value: '' },
  { label: '安全边距', value: 'safe' },
  { label: '小、无边距', value: 'noSafe' }
];

const safeMarginTip = '安全边距指的是页面边缘与内容之间的距离，它保证了所有关键信息都不会因为打印或装订过程中的误差而被裁剪掉或难以阅读';
const pageSize = 10;

export function Market() {
  const resume = useResumeStore();
  const { setTemplate } = useTemplateStore();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterOptions>({
    margin: '',
    color: ''
  });
  const [templateData, setTemplates] = useState<{ total: number; templates: TemplateOptions[]}>({ total: 0, templates: []  });

  const updateTemplates = () => {
    setTemplates(templateRegistry.getTemplates(page, pageSize, filter));
  }

  useEffect(updateTemplates, [filter, page]);

  const changeTemplate = (name: string) => {
    setTemplate(name);
    navigate('/');
  }

  const handleFilterChange = (newFilter: Partial<FilterOptions>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
    setPage(1);
  };

  return (
    <div className={styles.market}>
      <Form size="small" labelCol={{ span: 4 }}>
        <Form.Item label={<span>页面边距 <Tooltip placement="bottomRight" title={safeMarginTip}><QuestionCircleTwoTone /></Tooltip></span>}>
          <Radio.Group
            value={filter.margin}
            options={marginOptions}
            optionType="button"
            buttonStyle="solid"
            onChange={e => handleFilterChange({ margin: e.target.value })}>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Pagination current={page} pageSize={pageSize} total={templateData.total} onChange={setPage} />
      <Flex gap={32} wrap="wrap" justify="center">
        {
          templateData.templates.map((template) => (
            <div key={template.name} className={styles.template}>
              <div className={styles.preview} onClick={() => changeTemplate(template.name)}>
                <TemplatePreview template={<template.template resume={resume} />} home={template.home} margin={template.margin} />
              </div>
              <div className={styles.title}>{template.title}</div>
            </div>
          ))
        }
      </Flex>
      <Pagination current={page} pageSize={pageSize} total={templateData.total} onChange={setPage} />
    </div>
  )
}