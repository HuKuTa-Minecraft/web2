import { useGetFeedbacksQuery } from './feedbacksApi';
import FeedbackTable from './FeedbackTable';

export default function Laba9() {
  const { data: feedbacks = [], isLoading } = useGetFeedbacksQuery();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Отзывы</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <FeedbackTable feedbacks={feedbacks} />
      )}
    </div>
  );
}
