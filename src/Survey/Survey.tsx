import { useCallback, useState, useRef } from 'react';
import './Survey.css';

import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';


interface surveyJsonProps {
    surveyJson: Model;
    onComplete: (survey: Model) => void;
    onValueChanged: (survey: Model, options: any) => void;
    onVisibleChanged: (survey: Model, options: any) => void;
    onCurrentPageChanged: (survey: Model, options: any) => void;

}

    


const surveyJson = {
  pages: [{
    elements: [{
      type: "html",
      html: "<h2>Please tell us about your doggo</h2>"
    }]
  }, {
    elements: [{
      name: "Doggos Name",
      title: "What is your doggos name?",
        type: "text",
      isRequired: true
    }]
  }, {
    elements: [{
      name: "Their Age",
      title: "How old is your doggo?",
      type: "radiogroup",
        choices: ["0-1", "1-3", "3-5", "5-7", "7-10", "10+"],
        isRequired: true
    }]
    
    }, {
        elements: [{
      name: "Doggo Size",
        title: "What size is your doggo?",
        type: "radiogroup",
        choices: ["Small", "Medium", "Large"],
        isRequired: true
        
    }],
  
  }, {
    elements: [{
        name: "Doggo Health",
        title: "How is your Doggo?",
        type: "radiogroup",
        choices: ["A little chonky", "Tip Top", "Needs More Chonk"],
        isRequired: true

    }],
    }, {
    elements: [{
        name: "Doggo Activity",
        title: "How active is your doggo?",
        type: "radiogroup",
        choices: ["Not very active", "Moderately active", "Very active"],
        isRequired: true
    }], 
    }, {
    elements: [{
        name: "Doggo Food",
        title: "What food does your doggo not like?",
        type: "radiogroup",
        choices: ["Beef", "Pork", "Fish", "Lamb", "Other"],
        isRequired: true
    }],
    }, {
    elements: [{
        name: "Vegetarian",
        title: "Does your doggo want vegetables?",
        type: "radiogroup",
        choices: ["Yes", "No"],
        isRequired: true
    }],
  }],
  showQuestionNumbers: "off",
  pageNextText: "Next",
  completeText: "Complete",
  showPrevButton: false,
  firstPageIsStarted: true,
  startSurveyText: "Take the Survey",
  completedHtml: "Thank you for your feedback!",
  showPreviewBeforeComplete: "showAnsweredQuestions"
};
function Surveys( {surveyJson}: surveyJsonProps) {
    const [surveyResults, setSurveyResults] = useState("");
    const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  
    const onCompleteSurvey = useCallback((sender : any) => {
      setSurveyResults(JSON.stringify(sender.data, null, 4));
      setIsSurveyCompleted(true);
    }, []);
  
    return (
        <>
          <Survey
            json={surveyJson}
            onComplete={onCompleteSurvey}
          />
          {isSurveyCompleted && (
            <>
              <p>Result JSON:</p>
              <code>
                {surveyResults}
              </code>
            </>
          )}
        </>
      );
    }
    
    export default Surveys;