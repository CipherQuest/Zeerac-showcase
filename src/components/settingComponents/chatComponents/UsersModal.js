import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Modal } from "@mui/material";

import { useSelector } from "react-redux";
import LoginContainer from "../../loginComponents/LoginContainer";
import { useState } from "react";
import { useEffect } from "react";
import {
  getAllFirebaseUsers,
  startConversation,
} from "../../../api/firebaseQueries";

const useStyles = makeStyles(() => ({
  bidContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 330,
    padding: "20px 0px",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    background: "rgba(255, 255, 255, 0.31)",
    borderRadius: 16,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10.1px)",
    "-webkit-backdrop-filter": "blur(10.1px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "10px 0px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  userCard: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    padding: "0px 5%",
    maxHeight: 50,
    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "5px 20px",
    backgroundColor: "white",
    borderRadius: 8,
    cursor: "pointer",
  },
  "@media (max-width: 630px)": {
    bidContainer: {
      width: "80%",
      height: "50%",
    },
  },
}));

const BidModal = ({ isOpen, setOpen }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);
  const { allConversations } = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const firebaseSubscription = getAllFirebaseUsers(
      setUserData,
      allConversations?.map((elem) => {
        return elem?.userIds?.filter(
          (userElem) => userElem !== currentUser?.firebaseDocId
        )[0];
      })
    );
    return () => {
      firebaseSubscription();
    };
  }, [allConversations, currentUser]);
  const dataToShow = useMemo(
    () => userData?.filter((elem) => elem?.id !== currentUser?.firebaseDocId),
    [userData, currentUser]
  );
  return (
    <Modal open={isOpen} onClose={() => setOpen((prev) => !prev)}>
      <div className={classes.bidContainer}>
        {currentUser ? (
          <div className={classes.content}>
            {dataToShow?.map((elem, index) => (
              <div
                className={classes.userCard}
                key={index}
                onClick={async () => {
                  await startConversation({
                    user: currentUser,
                    receiver: elem,
                  });
                  setOpen(false);
                }}
              >
                <Avatar src={elem?.photo} style={{ height: 30, width: 30 }} />
                <span style={{ marginLeft: 20 }}>{elem?.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <LoginContainer
            style={{ backgroundColor: "white", height: "420px" }}
          />
        )}
      </div>
    </Modal>
  );
};

export default BidModal;
