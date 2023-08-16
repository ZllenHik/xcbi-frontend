
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React, { PropsWithChildren } from 'react';
import {updateChartUsingPOST} from "@/services/xcbi/chartController";

interface UpdateModalProps {
  oldData: API.Chart;
  modalVisible: boolean;
  columns: ProColumns<API.Chart>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 更新数据模态框
 * @param fields
 */
const handleUpdate = async (fields: API.Chart) => {
  const hide = message.loading('正在更新');
  try {
    await updateChartUsingPOST({
      id: fields.id ?? 0,
      ...fields,
    });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败,请重试！');
    return false;
  }
};

/**
 * 更新数据模态框
 * @param props
 * @constructor
 */
const UpdateChartModal: React.FC<PropsWithChildren<UpdateModalProps>> = (props) => {
  const { oldData, columns, modalVisible, onSubmit, onCancel } = props;


  return (
    <Modal
      destroyOnClose
      title="更新"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProTable<API.Chart>
        rowKey="id"
        type="form"
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values) => {
          const success = await handleUpdate({
            ...values,
            id: oldData.id,
          });
          if (success) {
            onSubmit?.();
          }
        }}
      />
    </Modal>
  );
};

export default UpdateChartModal;
