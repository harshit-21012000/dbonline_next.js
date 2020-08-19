import '../../utils/Types';
import { get, keys } from 'idb-keyval';
import Styles from './Style.module.scss';
import CreateDataBaseModal from '../CreateDatabaseModal/CreateDatabaseModal';
import { useState, useEffect } from 'react';
import DashboardElement from './DashBoardElement/DashBoardElement';
export default function DashboardComponent() {
  /**
   *@type {[databaseType[],Function]} databaseArray
   */
  const [databaseArray, setDataBaseArray] = useState([]);
  const [showModal, setShowModal] = useState();
  useEffect(() => {
    keys().then((keys) => {
      keys.forEach((key) => {
        get(key).then((val) => {
          setDataBaseArray((databaseArr) => [...databaseArr, val]);
        });
      });
    });
  }, []);
  function showCreateDatabaseModalHandler() {
    setShowModal(true);
  }
  function closeCreateDatabaseModalHandler() {
    setShowModal(false);
  }
  console.log(databaseArray);
  if (databaseArray.length === 0) {
    return (
      <div className={Styles.container}>
        <div className={Styles.headerContainer}>
          <span className={Styles.recent}>Recently Used Database</span>
          <span className={Styles.new} onClick={showCreateDatabaseModalHandler}>
            + New Database
          </span>
        </div>
        <h1 className={Styles.noDatabaseHeader}>No Database Found</h1>
        <CreateDataBaseModal
          show={showModal}
          modalCancel={closeCreateDatabaseModalHandler}
        />
      </div>
    );
  } else {
    return (
      <div className={Styles.container}>
        <div className={Styles.headerContainer}>
          <span className={Styles.recent}>Recently Used Database</span>
          <span className={Styles.new} onClick={showCreateDatabaseModalHandler}>
            + New Database
          </span>
        </div>

        {databaseArray.map((database, index) => {
          return (
            <div key={index}>
              <DashboardElement databaseObj={database} />
            </div>
          );
        })}
        <CreateDataBaseModal
          show={showModal}
          modalCancel={closeCreateDatabaseModalHandler}
        />
      </div>
    );
  }
}