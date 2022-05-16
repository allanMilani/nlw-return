import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbak = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedbak.execute({
      type: 'BUG',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base64,lsadfhasldfhasduflhasidfuashdfiusaphf'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedbak.execute({
      type: '',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base64,sadkjlfhaskdlfhsaldf'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedbak.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,sdjhsudfhasiudfasdiufasdfihsdhf'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedbak.execute({
      type: 'BUG',
      comment: 'exemple comment',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  });
});