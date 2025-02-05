import { useEffect, useMemo, useState } from 'react';
import { FilterOptions, TemplateOptions, templateRegistry } from './register';
import { Button, Empty, Flex, Form, Pagination, Radio, Tooltip } from 'antd';
import { useResumeStore } from '../resume/store';
import styles from './market.module.css';
import { TemplatePreview } from '../preview/TemplatePreview';
import { useTemplateStore } from '../resume/template';
import { useNavigate } from 'react-router-dom';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { DownOutlined, QuestionCircleTwoTone, UpOutlined } from '@ant-design/icons';

const marginOptions: CheckboxGroupProps<string>['options'] = [
  { label: '全部', value: '' },
  { label: '安全边距', value: 'safe' },
  { label: '小、无边距', value: 'noSafe' }
];
const safeMarginTip = '安全边距指的是页面边缘与内容之间的距离，它保证了所有关键信息都不会因为打印或装订过程中的误差而被裁剪掉或难以阅读';

const colorOptions: CheckboxGroupProps<string>['options'] = [
  { label: '全部', value: '' },
  { label: '黑白', value: 'grayscale' },
  { label: '彩色', value: 'color' },
];
const colorTip = '投递彩色简历可能导致打印时出现颜色失真、对比度不足以及增加打印成本的问题，尤其在黑白打印情况下可能影响简历的可读性和专业呈现。';

const columnOptions: CheckboxGroupProps<string>['options'] = [
  { label: '全部', value: '' },
  { label: '单栏', value: 'single' },
  { label: '双栏', value: 'double' },
  { label: '三栏以上', value: 'more' },
];

const pageSize = 12;

export function Market() {
  const resume = useResumeStore();
  const { setTemplate } = useTemplateStore();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterOptions>({
    margin: '',
    color: '',
    column: '',
  });
  const [showMoreFilter, setShowMoreFilter] = useState(false);
  const [templateData, setTemplates] = useState<{ total: number; templates: TemplateOptions[]}>({ total: 0, templates: []  });
  const filterCount = useMemo(() => {
    let count = 0;
    for (const key in filter) {
      if (filter[key as keyof FilterOptions] !== '') {
        count++;
      }
    }
    return count;
  }, [filter]);

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
      <Flex justify="center">
        <Form size="small" labelCol={{ span: 5 }} style={{ width: '520px', height: showMoreFilter ? undefined : '36px', overflow: 'hidden' }}>
          <Form.Item label={<span>页面边距 <Tooltip placement="bottomRight" title={safeMarginTip}><QuestionCircleTwoTone /></Tooltip></span>}>
            <Radio.Group
              value={filter.margin}
              options={marginOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => handleFilterChange({ margin: e.target.value })}>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={<span>色彩 <Tooltip placement="bottomRight" title={colorTip}><QuestionCircleTwoTone /></Tooltip></span>}>
            <Radio.Group
              value={filter.color}
              options={colorOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => handleFilterChange({ color: e.target.value })}>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={<span>栏数</span>}>
            <Radio.Group
              value={filter.column}
              options={columnOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => handleFilterChange({ column: e.target.value })}>
            </Radio.Group>
          </Form.Item>
        </Form>
        {
          showMoreFilter ?
            <Button type="text" size="small" icon={<UpOutlined />} onClick={() => setShowMoreFilter(false)}>收起筛选 {filterCount > 0 ? `(${filterCount})` : null}</Button> :
            <Button type="text" size="small" icon={<DownOutlined />} onClick={() => setShowMoreFilter(true)}>更多筛选 {filterCount > 0 ? `(${filterCount})` : null}</Button>
        }
      </Flex>
      <Pagination current={page} align="center" pageSize={pageSize} total={templateData.total} onChange={setPage} />
      <Flex gap={32} wrap="wrap" justify="center" style={{ margin: '16px 0' }}>
        {
          templateData.templates.length > 0 ? templateData.templates.map((template) => (
            <div key={template.name} className={styles.template}>
              <div className={styles.preview} onClick={() => changeTemplate(template.name)}>
                <TemplatePreview template={<template.template resume={resume} />} home={template.home} margin={template.margin} />
              </div>
              <div className={styles.title}>{template.title}</div>
            </div>
          )) : <Empty />
        }
      </Flex>
      <Pagination current={page} align="center" pageSize={pageSize} total={templateData.total} onChange={setPage} />
    </div>
  )
}