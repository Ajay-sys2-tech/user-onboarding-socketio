const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');

module.exports = (socket) => {
  socket.on('start_onboarding', async () => {
    const userId = socket.userId;
    console.log(`User ${userId} started onboarding`);
   
    try {
      await User.findOneAndUpdate(
        { _id: userId, chatStatus: -1 },       
        { $set: { chatStatus: 0 } },   
      ); 

      const answered = await Answer.find({ userId });
      const answeredQuestionIds = answered.map(a => a.questionId);

      const nextQuestion = await Question.findOne({ 
        _id: { $nin: answeredQuestionIds }
      }).sort({ order: 1 });

      if (!nextQuestion) {
        socket.emit('complete', { message: 'Onboarding complete!' });
      } else {
        socket.emit('question', {
          questionNumber: nextQuestion.order,
          questionId: nextQuestion._id,
          text: nextQuestion.text,
          type: nextQuestion.type,
          options: nextQuestion.options || []
        });
      }
    } catch (err) {
      console.error(err);
      socket.emit('error', { message: 'Failed to start onboarding' });
    }
  });

  socket.on('answer', async (data) => {
    
    if( !data || typeof data !== 'object') {
      socket.emit('payload_error', { message: 'Invalid payload data' });
      return;
   }
    const { questionId, answer, questionNumber } = data;
    const userId = socket.userId;
    console.log(`User ${userId} answered question ${questionId}: ${answer}`);

    if( !userId || !questionId || answer === undefined || questionNumber === undefined) {
      socket.emit('payload_error', { message: 'Invalid payload data' });
      return;
    }
    try {

      await Answer.findOneAndUpdate(
        { userId, questionId },
        { answer, timestamp: new Date() },
        { upsert: true }
      );

      await User.findByIdAndUpdate(userId, {
        chatStatus: questionNumber // Update user's chat status
      });

      // Fetch next question
      // const answered = await Answer.find({ userId });
      // const answeredQuestionIds = answered.map(a => a.questionId.toString());

      // const nextQuestion = await Question.findOne({ 
      //   _id: { $nin: answeredQuestionIds }
      // }).sort({ order: 1 });
      const nextQuestion = await Question.findOne({
        order: questionNumber + 1,
      });

      if (!nextQuestion) {
        socket.emit('complete', { message: 'Onboarding complete!' });
      } else {
        socket.emit('question', {
          questionNumber: nextQuestion.order,
          questionId: nextQuestion._id,
          text: nextQuestion.text,
          type: nextQuestion.type,
          options: nextQuestion.options || []
        });
      }
    } catch (err) {
      console.error(err);
      socket.emit('error', { message: 'Failed to save answer' });
    }
  });

  socket.on('disconnect', () => {
    socket.disconnect(true);
    console.log(`User ${socket.userId} disconnected`);
  });
};
