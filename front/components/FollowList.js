import React from 'react';
import PropTypes from 'prop-types'
import { Button, Card, List } from 'antd';
import {StopOutlined} from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST } from '../reducers/action';

const FollowList = ({header, data, onClickMore, loading}) => {
    const dispatch = useDispatch();
    const onCancle = (data) => () =>{
        dispatch({
            type: UNFOLLOW_REQUEST,
            data: data
        })
    };
    return (
        <List
        style={{marginBottom: 20}}
        grid={{gutter:4, xs:2, md:3}}
        size='small'
        header={<div>{header}</div>}
        loadMore={(
         <div style={{textAlign: 'center', margin:'10px 0'}}>
            <Button onClick={onClickMore} loading={loading}>더보기</Button>
         </div>
        )}
        bordered
        dataSource={data}
        renderItem={(item)=>(
            <List.Item style={{marginTop: 20}}>
                <Card actions={[<StopOutlined key="stop" onClick={onCancle(item.id)} />]}>
                    <Card.Meta description={item.nickname} />
                </Card>
            </List.Item>
        )}
        />
    );
};

FollowList.protoTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    onClickMore: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default FollowList;