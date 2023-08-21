import React, {useEffect, useState} from 'react';
import {AutoComplete, Input, notification} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import TypographyHead from "../../components/Typography/TypographyHead.jsx";
import {TypoGraphyType} from "../../components/Typography/constants.js";

const SearchReference = ({
                             searchAction,
                             selectedItems,
                             setSelectedItems,
                             title,
                         }) => {
    const [options, setOptions] = useState([]);

    const getOptionsDefault = () => {
        searchAction().then(response=> {
            setOptions(response?.data.map((item) => ({ value: item.questionContents?.title, id: item.questionContents?.id })))
        })
    };

    useEffect(() => {
        getOptionsDefault();
    },[]);

    const [inputValue,setInputValue] = useState('');
    const handleSearch = (value) => {
        const params = {
            query: value,
            pageSize: 20
        }
        searchAction(params).then(response=> {
            setOptions(response?.data.map((item) => ({ value: item.questionContents?.title, id: item.questionContents?.id })));
        })
    };

    const handleSelect = (value, option) => {
        const selectedItem = { id: option.id, title: value };
        if(selectedItems?.some(item => item.id === selectedItem.id)) {
            notification.info({message: 'Keyword already selected'})
        } else {
            setSelectedItems([...selectedItems, selectedItem]);
            console.log([...selectedItems, selectedItem])

            setInputValue('')
            getOptionsDefault();
            setInputValue(value)
        }
        setInputValue('')
    };



    const handleRemoveSelected =(id) => {
        const newData = selectedItems?.filter(item => item.id !== id);
        setSelectedItems(newData);
    }

    return (
        <div>
            <TypographyHead className={'my-heading'}
                            type={TypoGraphyType.SUB_HEAD}
                            content={title}
            />
            <AutoComplete
                style={{width: '100%', paddingTop: '16px'}}
                options={options}
                onSelect={handleSelect}
                onSearch={handleSearch}
                placeholder="Search items"
                value={inputValue}
                onChange={value=> setInputValue(value)}
            >
                <Input.Search />
            </AutoComplete>

            <div>
                <div>
                    {Array.isArray(selectedItems) && selectedItems.map((item) => (
                        <div key={item.id}
                             style={{
                                 display: 'flex',
                                 padding: '18px',
                                 justifyContent:'space-between',
                                 borderBottom: '1px solid var(--green-color)',
                                 alignItems:'center'}}>
                            <span key={item.id}>{item.title}</span>
                            <CloseOutlined
                                style={{
                                    color: 'red',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleRemoveSelected(item.id)}
                            />
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchReference;

