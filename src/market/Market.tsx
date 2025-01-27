import { useRef } from 'react';
import { templateRegistry } from './register';
import { Flex } from 'antd';
import { useResumeStore } from '../resume/store';
import styles from './market.module.css';
import { TemplatePreview } from './TemplatePreview';
import { useTemplateStore } from '../resume/template';
import { useNavigate } from 'react-router-dom';

export function Market() {
  const resume = useResumeStore();
  const { setTemplate } = useTemplateStore();
  const templates = useRef(templateRegistry.getTemplates());
  const navigate = useNavigate();

  function changeTemplate(name: string) {
    setTemplate(name);
    navigate('/');
  }

  return (
    <div className={styles.market}>
      <Flex gap={32} wrap="wrap" justify="center">
        {
          templates.current.map((template) => (
            <div key={template.name} className={styles.template}>
              <div className={styles.preview} onClick={() => changeTemplate(template.name)}>
                <TemplatePreview template={<template.template resume={resume} />} />
              </div>
              <div className={styles.title}>{template.title}</div>
            </div>
          ))
        }
      </Flex>
    </div>
  )
}