import React, {useContext, useState} from "react";
import {StudentContext} from "../../others/Context";
import useRegGetAll from "../../services/useRegGetAll";
import {addStudentToTuition} from "./helper";

const EnrollToTuition = () => {
    const {student, dispatch} = useContext(StudentContext);
    const {data, error: error2, loading} = useRegGetAll("/api/v1/tuition/get/all");
    const [selectedTuition, setSelectedTuition] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    return (
        <div className='main-container'>
            <div>
                <h3>ENROLL TO TUITION</h3>
                <div className='main-heading'>
                    <select className='main-select' onChange={e => setSelectedTuition(e.target.value)}>
                        <option value=''>Select a tuition</option>
                        {data && data.tuitionList.map((t) => (
                            <option key={t.tuitionId} value={t.tuitionId}>{t.name} - {t.location}</option>
                        ))}
                    </select>
                    <button className='btn btn-success'
                            disabled={!(selectedTuition && student.student)}
                            onClick={() => addStudentToTuition(student.student.studentId, selectedTuition, dispatch, setError, setSuccess)}
                    >Enroll into tuition
                    </button>
                </div>
            </div>
            {
                error ? (
                    <p className='error-msg'>{error.message}</p>
                ) : null
            }
            {
                success ? (
                    <p className='success-msg'>{success}</p>
                ) : null
            }
        </div>
    );
}

export default EnrollToTuition;
