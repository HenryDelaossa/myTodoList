import "./todo.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { onValue, ref, remove, set, update } from "firebase/database";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faFilePen, faTrash, faFlagCheckered, faPersonRunning, faCirclePlus, faSquareCheck, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useContextAuth } from "../../context/contextAuth";


export const Todo = () => {


    const navigate = useNavigate();

    const { userLoggedIn } = useContextAuth();

    const [todoItem, setTodoItem] = useState('');
    const [state, setState] = useState('pending');
    const [todoListAll, setTodoListAll] = useState([]);
    const [temporaryId, setTemporaryId] = useState();
    const [isUpdating, setIsUpdating] = useState(false);

    /**
     * When the user clicks the logout button, signOut() is called, which returns a promise, which is
     * then resolved by navigating to the homepage.
     */
    const handleOutSesion = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((err) => alert(err.message))
    }

    /**
     * When the user clicks the add button, a new todo item is added to the database with a unique id,
     * the todo item, and the state of the todo item.
     */
    const addTodoToDb = () => {
        const uid = uuidv4();
        set(ref(db, `${auth.currentUser.uid}/${uid}`), {
            todoItem,
            uid,
            state
        });
        setTodoItem('')
    };

    /**
     * "deleteTodoFromDb" is a function that takes an itemId as an argument and then deletes the item
     * from the database using the "remove" function from the "firebase-admin" package.
     */
    const deleteTodoFromDb = (uid) => {
        remove(ref(db, `${auth.currentUser.uid}/${uid}`))
    }

    /**
     * When the user clicks on the update button, the updateTodo function is called, which sets the
     * isUpdating state to true, sets the todoItem state to the todoItem that was passed in, and sets
     * the temporaryId state to the uid that was passed in.
     */
    const updateTodo = (todoItem, uid) => {
        setIsUpdating(true);
        setTodoItem(todoItem);
        setTemporaryId(uid);
    }

    /**
     * When the user clicks the update button, update the todo item in the database with the new todo
     * item and set the state to pending.
     */
    const handleConfirmUpdateTodoFromDb = () => {
        update(ref(db, `${auth.currentUser.uid}/${temporaryId}`), {
            todoItem,
            uid: temporaryId,
            state: 'pending'
        });
        setTodoItem('');
        setIsUpdating(false);
        setState('pending')
    }

    /**
     * If the state is pending, then set the state to done, otherwise set the state to pending.
     */
    const handleState = (todoItem, uid, state) => {
        state === 'pending' ? state = 'done' : state = 'pending'
        update(ref(db, `${auth.currentUser.uid}/${uid}`), {
            todoItem: todoItem,
            uid,
            state
        });
    }

    useEffect(() => {

        userLoggedIn ?
            onValue(ref(db, `${auth.currentUser.uid}`), (snapshot) => {
                setTodoListAll([]);
                const data = snapshot.val();
                if (data !== null) Object.values(data).map(act => setTodoListAll(old => [...old, act]))
            })
            :
            navigate("/");

    }, [userLoggedIn, navigate]);


    return (
        <>
            {
                <section className="section-todo-list">
                    <h2>Lista de tareas</h2>
                    <div className="ctn-inputText-todo">
                        <input
                            type="text"
                            placeholder="nueva tarea"
                            name="addTodoList"
                            id="addTodoList"
                            value={todoItem}
                            onChange={(e) => setTodoItem(e.target.value)}
                        />
                        <button onClick={addTodoToDb} disabled={(todoItem.length <= 0) || isUpdating} className="btn-add-todo"><FontAwesomeIcon icon={faCirclePlus} /></button>
                    </div>
                    {
                        isUpdating &&
                        <div>
                            <button onClick={() => handleConfirmUpdateTodoFromDb()} className='btn-todo-list btn-confirm-update'><FontAwesomeIcon icon={faSquareCheck} />update</button>
                        </div>
                    }
                    <div className="ctn-items-todo">
                        {todoListAll.map(({ uid, todoItem, state }, i) =>
                            <div
                                key={i}
                                className='inner-ctn-items'
                            >
                                <div style={{ marginRight: '2rem', display: 'flex' }}>

                                    <h4
                                        style={{
                                            textDecoration: state === "pending" ? 'none' : 'line-through',
                                            color: (state === 'pending' && 'orange') || (state === 'done' && 'green')
                                        }}><span style={{ marginRight: "1rem" }}>{<FontAwesomeIcon icon={state === 'done' ? faFlagCheckered : faPersonRunning} />}</span>{todoItem}</h4>
                                </div>
                                <div className="ctn-btn-todo">
                                    <button className="btn-todo-list btn-update" onClick={() => updateTodo(todoItem, uid)}><FontAwesomeIcon icon={faFilePen} /></button>
                                    <button className="btn-todo-list btn-state" onClick={() => handleState(todoItem, uid, state)} ><FontAwesomeIcon icon={faClipboardCheck} /></button>
                                    <button className="btn-todo-list btn-delete" onClick={() => deleteTodoFromDb(uid)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="ctn-btn-signOut">
                        <button onClick={handleOutSesion} className="btn-todo-list btn-signOut"><FontAwesomeIcon icon={faRightFromBracket} /> salir</button>
                    </div>

                </section>

            }
        </>
    )
}
