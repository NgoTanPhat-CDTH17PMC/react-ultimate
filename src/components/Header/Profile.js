import { Modal, Tab, Tabs } from "react-bootstrap";
import UserInfo from "./UserInfo";
import Password from "./Password";
import History from "./History";

const Profile = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal-profile"
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey={"profile"}
            id="uncotrolled-tabexample"
            className="mb-3"
          >
            <Tab eventKey={"profile"} title="User Information">
              <UserInfo />
            </Tab>
            <Tab eventKey={"password"} title="Change Password">
              <Password />
            </Tab>
            <Tab eventKey={"history"} title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
