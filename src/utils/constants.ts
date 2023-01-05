export const globalStyles = {
  palette: {
    white0: '#ffffff',
    orange0: '#F2530A',
  },
};

export const questions = {
  questionsList: [1, 2, 3],
  questionsData: {
    1: {
      question: 'What is this?',
      answer: 'Yes',
      options: ['Yes', 'No'],
    },
    2: {
      question: 'When was that?',
      answer: '2022',
      options: ['2022', '2023'],
    },
    3: {
      question: 'Why was that?',
      answer: 'Because',
      options: ['Because', "That's why"],
    },
  },
};

export const rules = [
  'some rule',
  'some other rule',
  'this is a rule for this component that is written like this because I wan to test long text in the screen to check if it is working or not',
];

export const apiData = {
  endPoint:
    'https://le4qltnfti.execute-api.ap-southeast-1.amazonaws.com/productivity',
  fetchOldTasks: '/fetch-old-tasks',
  addTask: '/add-task',
};

export const listHours = [
  7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
];
