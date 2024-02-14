import { DeleteOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";
import { DStore } from "database";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { storeState } from "../../../../store";

const { Column } = Table;

const StoreData = () => {
  const { t } = useTranslation();
  const [store, setStoreState] = useRecoilState(storeState);

  return (
    <Table dataSource={store} size="large" pagination={{ pageSize: 7 }}>
      <Column title={t("store.data.column.1.label")} dataIndex="asset" key="asset" />
      <Column
        title={t("store.data.column.2.label")}
        dataIndex="quantity"
        key="quantity"
        align="right"
      />
      <Column
        title={t("store.data.column.3.label")}
        key="action"
        align="center"
        render={(_: any, record: DStore) => (
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size={"large"}
            onClick={() => {
              setStoreState(store.filter((s) => s.key !== record.key));
            }}
          />
        )}
      />
    </Table>
  );
};

export default StoreData;
