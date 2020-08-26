import React, { useState } from 'react';
import styles from './ChatList.module.css'
import ChatModal from '../ChatModal/ChatModal'

const ChatList = ({message, nsSocket, roomId}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
    let { text, type, filename, time, userName, avatar } = message;
    const convertedDate = new Date(time).toLocaleTimeString();
    const convertedMsg = convertMsg(text, type, filename);//switch문 이용해서 데이터 타입에 따라 다른 태그를 넣어줌
    function Open() {
      setIsMouseOver(true)
    }
    function Close(){
      setIsMouseOver(false)
    }
    function Delete() { 
      type="deleted"
      nsSocket.emit("newMessageToServer", {...message, type:"deleted", roomId})
    }

  return (
    <li className={styles.chatset_li} onMouseEnter={Open} onMouseLeave={Close}>
      <img className={styles.chatset_image} src={avatar} alt="아바타" />
      <div className={styles.chatset_name}>{userName} <small className={styles.chatset_time}>&ensp;{convertedDate}</small></div>
      <div className={styles.chatset_message}>{convertedMsg}</div>
      {isMouseOver && <ChatModal message={message} Delete={Delete}></ChatModal>}
    </li>
  );
} 

export default ChatList;


function convertMsg(text, type, filename) {
  let tag = "";
  switch (type) {
    case 'text':
      tag = <div dangerouslySetInnerHTML={{__html: text}}></div>
      break;
    case 'deleted':
      tag = <strong className={styles.deleted}><i className="info circle icon"></i>삭제된 메시지</strong>
      break; 
    case 'image/png': case 'image/jpeg': case 'image/gif':
      tag = <img src={text} alt="이미지"></img>
      break;
    case 'video/mp4':
      tag = <video src={text} width='400' controls></video>
      break;
    default:
      tag = <a href={text} download>{filename}</a>
      break;
  }
  return tag;
}