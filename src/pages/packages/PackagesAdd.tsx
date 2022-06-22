import { useState, useEffect } from "react";
import Loading from "../../components/UI/Loading";
import NoteSender from "../../components/Dashboard/Packages/CreatePackage/Sender/NoteSender";
import NoteEditor from "../../components/Dashboard/Packages/CreatePackage/Editor/NoteEditor";

const PackagesAdd = () => {
  const [ready, setReady] = useState(false);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert("");
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  return (
    <div>
      {!ready ? (
        <NoteEditor alert={alert} setReady={setReady} setAlert={setAlert} />
      ) : (
        <>
          {!loading ? (
            <NoteSender
              ready={ready}
              alert={alert}
              setReady={setReady}
              setLoading={setLoading}
              setAlert={setAlert}
            />
          ) : (
            <Loading />
          )}
        </>
      )}
    </div>
  );
};

export default PackagesAdd;
