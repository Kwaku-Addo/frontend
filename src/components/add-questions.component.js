import {useState} from 'react';
import Axios from 'axios';

const AddQuestions = () => {
    const [question, setQuestion] = useState('');
    const [description, setDesc] = useState('');


    const add = () => {
        Axios.post('http://localhost:5050/api/question', {
            question: question,
            desc: description,
          })
          .then((res) => {
            console.log(res)
          });
    }    


    return (
        <div>
            <div className='form-control'>
                <h3>Sign Up</h3>
                <label>Question</label>
                <input type='text' placeholder='Question' onChange={(e) => setQuestion(e.target.value)}/>
                <label>Description</label>
                <input type='text' placeholder='Description' onChange={(e) => setDesc(e.target.value)}/>
                
                <button className="btn" color="steelblue" onClick={add}>Add Question</button>
            </div>
        </div>
    )
}

export default AddQuestions
