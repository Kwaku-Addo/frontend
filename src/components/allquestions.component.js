import {useState, useEffect} from 'react';
import Axios from 'axios';
import {FaTimes} from 'react-icons/fa'


const AllQuestions = () => {
    const [allQuizzes, setallQuizzes] = useState([]);
    const [currentQuiz, setcurrentQuiz] = useState(null);
    const [currentIndex, setcurrentIndex] = useState(-1);
    const [radioOptions, setradioOptions] = useState({})
    const [checkedItems, setCheckedItems] = useState({}); 

    // const [results, setResults] = useState([{}]);

    const setCheckbox = (value, checked, question_id, question_title, quiz_id) => {
        setCheckedItems({
            ...checkedItems,
            [quiz_id] : {[question_id] : {
                Answer: radioOptions[question_id],
                Explanations: {[value] : checked}
            }}
          });

    }

    const viewAnswers = () =>{
        console.log("Radio Answer: ", radioOptions);
        console.log("CheckedItems: ", checkedItems);
    }

    const checkRadioButton = (question_id, label) => {
        if (!radioOptions[question_id]) {
            return false;
        }
        return radioOptions[question_id] === label;

    }

    const setradio = (id , value) => {
        setradioOptions((state) => {
            console.log(state);
            return {
                ...state,
                [id] : value
            }
        });
    
    }


    const onDelete = (id) => {
        Axios.delete(`http://localhost:5050/api/delete/${id}`)
        .then((res) => {
            console.log(res)
            setallQuizzes(allQuizzes.filter((question) => question._id !== id))
        })
        .catch(err => {
            console.log(err.response); 
        });
    }; 

    const setActiveQuiz = (quiz, index) => {
        console.log(quiz)
        setcurrentQuiz(quiz);
        setcurrentIndex(index)
    };

    useEffect(() => {
        Axios.get('http://localhost:5050/api/findAllQ').then((response) => {
          console.log(response.data);
          setallQuizzes(response.data) 
        })
        .catch(function (error) {
            console.log(error);
        });

    }, []);

    return (
        <div >
            <h4>Quiz List</h4>
            {/* <ul className="list-group">
                {allQuizzes && allQuizzes.map((question, index) => (
                    <li>{index + 1}.  {question.quiz}</li>
                ))}
            </ul> */}
            <div className={`quiz`} >
                {allQuizzes && allQuizzes.map((quizzes, index) => (
                    <h3 
                    onClick= {() => setActiveQuiz(quizzes, index)}
                    > {quizzes.quiz} {''} 
                        <FaTimes 
                            style={{color: 'red', cursor: 'pointer'}}
                            //  onClick={() => onDelete(quizzes._id)}
                        />
                    </h3>
                ))}
            </div>

            <div>
                {currentQuiz ? (
                    <div> 
                        <h3>{currentQuiz.quiz}</h3>
                        <button onClick={viewAnswers}>View Answers</button>
                        {currentQuiz.questions && currentQuiz.questions.map((questions, indexx) => (
                            <div key={questions.question_id}>
                                <h3>{questions.question_id}{'. '}{questions.question_title}</h3>    
                                <div>
                                    <input 
                                        type="radio" 
                                        value="Oui" 
                                        checked={checkRadioButton(questions.question_id, "Oui")}  
                                        onChange={(e) => setradio(questions.question_id, e.target.value)} 
                                    /> Oui
                                    <input 
                                        type="radio" 
                                        value="Plutot Oui"  
                                        checked={checkRadioButton(questions.question_id, "Plutot Oui")}  
                                        onChange={(e) => setradio(questions.question_id, e.target.value)} 
                                    /> Plutot Oui
                                    <input 
                                        type="radio" 
                                        value="Plutot Non"  
                                        checked={checkRadioButton(questions.question_id, "Plutot Non")}  
                                        onChange={(e) => setradio(questions.question_id, e.target.value)}
                                    /> Plutot Non
                                    <input 
                                        type="radio" 
                                        value="Non" 
                                        checked={checkRadioButton(questions.question_id, "Non")}  
                                        onChange={(e) => setradio(questions.question_id, e.target.value)}
                                    /> Non
                                </div>
                                {radioOptions[questions.question_id] === "Plutot Non"
                                || radioOptions[questions.question_id] === "Plutot Oui"
                                || radioOptions[questions.question_id] === "Non" ? (
                                    <div>
                                        {questions.question_options && questions.question_options.map((options, index) => ( 
                                            <div>
                                                <label>
                                                    <input type="checkbox" value={options.options_id} 
                                                    checked={checkedItems[options.option_text]}  
                                                    onChange={(e) => setCheckbox(e.target.value, e.target.checked, questions.question_id, questions.question_id,currentQuiz.quiz_id )}
                                                    />
                                                    <span>{'  '}{options.options_id}{'. '}{options.options_text}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (<span>No Explanation Needed</span>)}
                            </div>
                        ))}
                    </div>
                ) : (<h3>Please click on a quiz</h3>)}
            </div>
        </div>
    )
}

export default AllQuestions
