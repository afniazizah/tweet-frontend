import { finishProcess, updateProcess } from '../features/analisisSlice';
import socket from '../socket/init';

const socketMiddleware = (store) => {
    // console.log(store);
    // socket.on('updateAnalisis', (data) => {
    //     // Dispatch an action to update the state with the new data
    //     store.dispatch({
    //         type: 'analisis/updateData',
    //         payload: data,
    //     });
    // });
    socket.on('update analisis', (data) => {
        store.dispatch(updateProcess(data));
    })

    socket.on('finish analisis', (data) => {
        console.log(data)
        store.dispatch(finishProcess(data));
    })

    return (next) => (action) => {
        if(action.type === 'analisis/startProcess') {
            // Emit a socket event when the process starts
            socket.emit('analisis', action.payload);
        }
        // Check if the action is related to socket events
        // if (action.type === 'analisis/startProcess') {
        //     // Emit a socket event when the process starts
        //     socket.emit('startAnalisis', action.payload);
        // } else if (action.type === 'analisis/updateProcess') {
        //     // Emit an update event with the current process status
        //     socket.emit('updateAnalisis', action.payload);
        // }
        
        // Call the next middleware or reducer
        return next(action);
    }
}

export default socketMiddleware;