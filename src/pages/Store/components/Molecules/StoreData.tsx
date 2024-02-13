import { DeleteOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";
import { DStore } from "database";
import { useRecoilState } from "recoil";
import { storeState } from "store";

const { Column } = Table;

const StoreData = () => {
  const [store, setStoreState] = useRecoilState(storeState);

  return (
    <Table dataSource={store} size="large" pagination={{ pageSize: 7 }}>
      <Column title="Asset" dataIndex="asset" key="asset" />
      <Column
        title="Quantity"
        dataIndex="quantity"
        key="quantity"
        align="right"
      />
      <Column
        title="Action"
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
