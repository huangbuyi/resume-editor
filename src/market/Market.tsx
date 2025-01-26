import { useRef } from 'react';
import { templateRegistry } from './register';
import { Flex } from 'antd';
import { useResumeStore } from '../resume/store';
import styles from './market.module.css';
import { TemplatePreview } from './TemplatePreview';

export function Market() {
  const resume = useResumeStore();
  const templates = useRef(templateRegistry.getTemplates());

  return (
    <div className={styles.market}>
      <Flex gap={32} wrap="wrap" justify="center">
        {
          templates.current.map((template) => (
            <div key={template.name} className={styles.template}>
              <div className={styles.preview}>
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