import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react'
import { useSelector } from 'react-redux';

const CreateNS = ({Socket}) => {
  let {_id} = useSelector(state=>state.user.userData)  //유저아이디

  const [Open, setOpen] = useState(false);
  const [Size, setSize] = useState();
  const [name, setName] = useState("");

  function show(size) {
    setSize(()=>size);
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  function createNs(e){
    e.preventDefault();
    //axios요청으로 뺄 수 있나?
    Socket.emit("NewNs", {name, _id});
    setOpen(false);
    setName("");
  }

  function handleNstitle(event) {
    setName(event.target.value)
  }

  return (
    <>
      <Button onClick={() => { show('small') }}>NS 생성</Button>
        <Modal size={Size} open={Open} onClose={close} centered={true}>
          <Modal.Header >네임스페이스 생성</Modal.Header>
          <Modal.Content>
            <p style={{color : "black"}}>네임스페이스 이름 입력 (공백불가)</p>
            <form onSubmit={createNs}>
              <input type="text" value={name} onChange={handleNstitle} placeholder="네임스페이스 이름 입력"/>
            </form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={close}>닫기</Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='생성'
              onClick={createNs}
            />
          </Modal.Actions>
        </Modal>
    </>
  );
};

export default CreateNS;