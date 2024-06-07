import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { useSentenceStore } from '../store/sentenceStore'
import TypingTest from '../components/TypingTest'
import { shuffleArray } from '../lib/utils'

const topicsSearchSchema = z.object({
  topic: z.string().catch('biology'),
  eclipsedTime: z.number().catch(60),
})
export const Route = createFileRoute('/practice')({
  component: () => <Practice />,
  validateSearch: (search: Record<string, unknown>) => topicsSearchSchema.parse(search)
})

const Practice = () => {
  const { topic, eclipsedTime } = Route.useSearch()
  const sentences = useSentenceStore((state) => state.getSentencesByTopic(topic || ''));
  if (sentences.length === 0) {
    return <div>
      Not found text of topic {topic}
    </div>
  }
  return <TypingTest eclipsedTime={eclipsedTime} text={shuffleArray([...sentences]).join(" ").slice(0, 500)} />
}