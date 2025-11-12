import React, { useState } from 'react';
import styled from 'styled-components';
import { spacing, radius } from '@/theme/tokens';
import { projectsDB, ProjectFeedback } from '@/services/databaseService';
import { reinforcementLearning } from '@/services/reinforcementLearning';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.gray900};
  margin: 0 0 ${spacing.md} 0;
  font-size: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.gray900};
  font-weight: 600;
  margin-bottom: ${spacing.sm};
  font-size: 0.875rem;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

const RatingButton = styled.button<{ selected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ theme, selected }) => (selected ? theme.primaryPurple : theme.gray300)};
  background: ${({ theme, selected }) => (selected ? theme.primaryPurple : 'transparent')};
  color: ${({ theme, selected }) => (selected ? theme.white : theme.gray600)};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primaryPurple};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${spacing.md};
  border: 1px solid ${({ theme }) => theme.gray300};
  border-radius: ${radius.md};
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryPurple};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-top: ${spacing.lg};
`;

const Button = styled.button`
  flex: 1;
  padding: ${spacing.md};
  border: none;
  border-radius: ${radius.full};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const SubmitButton = styled(Button)`
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
`;

const CancelButton = styled(Button)`
  background: ${({ theme }) => theme.gray200};
  color: ${({ theme }) => theme.gray900};
`;

interface FeedbackModalProps {
  projectId: string;
  projectTitle: string;
  onClose: () => void;
  onSubmit?: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ projectId, projectTitle, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [timeAccuracy, setTimeAccuracy] = useState(0);
  const [budgetAccuracy, setBudgetAccuracy] = useState(0);
  const [learningGain, setLearningGain] = useState(0);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0 || difficulty === 0 || timeAccuracy === 0 || budgetAccuracy === 0 || learningGain === 0) {
      alert('Please rate all aspects before submitting');
      return;
    }

    const feedback: ProjectFeedback = {
      rating,
      difficulty,
      timeAccuracy,
      budgetAccuracy,
      learningGain,
      comments,
      completedAt: new Date().toISOString(),
    };

    // Save feedback and adapt recommendations
    reinforcementLearning.adaptToFeedback(projectId, feedback);

    setSubmitted(true);
    setTimeout(() => {
      onSubmit?.();
      onClose();
    }, 1500);
  };

  if (submitted) {
    return (
      <Overlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <div style={{ textAlign: 'center', padding: spacing.lg }}>
            <div style={{ fontSize: '3rem', marginBottom: spacing.md }}>✅</div>
            <ModalTitle>Thank You!</ModalTitle>
            <p style={{ color: '#6B7280', marginBottom: 0 }}>
              Your feedback helps us improve recommendations and personalize your learning experience.
            </p>
          </div>
        </ModalContent>
      </Overlay>
    );
  }

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Project Feedback</ModalTitle>
        <p style={{ color: '#6B7280', marginBottom: spacing.lg }}>
          Help us improve by sharing your experience with "{projectTitle}"
        </p>

        <FormGroup>
          <Label>How would you rate this project? ⭐</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((value) => (
              <RatingButton
                key={value}
                selected={rating === value}
                onClick={() => setRating(value)}
              >
                {value}
              </RatingButton>
            ))}
          </RatingContainer>
        </FormGroup>

        <FormGroup>
          <Label>Was the difficulty level accurate? 📊</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((value) => (
              <RatingButton
                key={value}
                selected={difficulty === value}
                onClick={() => setDifficulty(value)}
              >
                {value}
              </RatingButton>
            ))}
          </RatingContainer>
          <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '8px 0 0 0' }}>
            1 = Too Easy, 5 = Too Hard
          </p>
        </FormGroup>

        <FormGroup>
          <Label>Was the estimated time accurate? ⏱️</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((value) => (
              <RatingButton
                key={value}
                selected={timeAccuracy === value}
                onClick={() => setTimeAccuracy(value)}
              >
                {value}
              </RatingButton>
            ))}
          </RatingContainer>
          <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '8px 0 0 0' }}>
            1 = Much Longer, 5 = Much Shorter
          </p>
        </FormGroup>

        <FormGroup>
          <Label>Was the budget estimate accurate? 💰</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((value) => (
              <RatingButton
                key={value}
                selected={budgetAccuracy === value}
                onClick={() => setBudgetAccuracy(value)}
              >
                {value}
              </RatingButton>
            ))}
          </RatingContainer>
          <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '8px 0 0 0' }}>
            1 = Much More Expensive, 5 = Much Cheaper
          </p>
        </FormGroup>

        <FormGroup>
          <Label>How much did you learn? 📚</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((value) => (
              <RatingButton
                key={value}
                selected={learningGain === value}
                onClick={() => setLearningGain(value)}
              >
                {value}
              </RatingButton>
            ))}
          </RatingContainer>
          <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '8px 0 0 0' }}>
            1 = Nothing, 5 = A Lot
          </p>
        </FormGroup>

        <FormGroup>
          <Label>Additional Comments (Optional)</Label>
          <Textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Share your thoughts, suggestions, or improvements..."
          />
        </FormGroup>

        <ButtonGroup>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SubmitButton onClick={handleSubmit}>Submit Feedback</SubmitButton>
        </ButtonGroup>
      </ModalContent>
    </Overlay>
  );
};

export default FeedbackModal;
