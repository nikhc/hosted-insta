export const initialState=null;
export const reducer=(state,action)=>{
    if(action.type=="USER"){
        return action.payload
    }
    if(action.type=="clear"){
        return null
    }
    if(action.type=="UPDATE"){
        return {
            ...state,follower:action.payload.follower,
            following:action.payload.following
        }
    }
    if(action.type=="updatepic"){
        return{
            ...state,pic:action.payload
        }
    }
}