import { AudioOutlined } from '@ant-design/icons';
import { Input, Space ,message, Modal} from 'antd';
import React,{useState} from 'react'
import 'antd/dist/antd.css';

function App() {

const { Search } = Input;
const [isModalVisible, setIsModalVisible] = useState(false);
const[frequency, setFrequency] =useState(Number);
const[similarWords,setSimilarWords] = useState([]);
const[dataIsReady,setDataIsReady] = useState(Boolean);
const[input,setInput] = useState(String);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

const onSearch = (value: string) =>{ 
  setInput(value);
  success();
};

const success = () => {
  message
    .loading('Search in progress..', 1)
    .then(()=>search())
    .then(() => {
      if(dataIsReady) {message.success('Search is finished', 1)}
    })
    .then(() => showModal());
};


const search = async() =>{
  const response = await fetch("http://localhost:8080/search/getResult",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'charset':'utf-8'
    },
    body:JSON.stringify({
      searchText: input
    })
  });
  if(response.ok){
    const data = await response.json();
    setFrequency(data.frequency);
    setSimilarWords(data.similarWords);
    setDataIsReady(true);
  }
 }


  return (

    <div className="App">
       <Space direction="vertical">
       <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
      />
      <Modal title="Search Results" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>"Frequency: " {frequency}</p>
       
        <p>"Similar Word List: " {similarWords}
        </p>
        
      </Modal>
     </Space>
    </div>
  );
}

export default App;
