// questdata.ts

export const quests = [
    {
      title: "Forgot Girlfriend’s Birthday",
      description: "You've forgotten your girlfriend's birthday. Navigate this difficult conversation by showing empathy, taking accountability, and finding a way to make it right.",
      narrationAudioUrl: "https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbcyTZNM5xMPezJKG5wi9VcrNAQC6ajU0nZxuET",
      questCardImageUrl: "https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbcTXclUPjmLoQaxv9z3MBr1uV6qpRWK7dfPFDU",
      assistantId: "5fa87ca6-ab9a-45d9-8772-9dcb651ecdc4",
      scoringAlgorithmPrompt: `Scoring Rubric (100 Points)
  
  1. Initial Response & Acknowledgment (20 Points)
  Measures how quickly and sincerely they recognize the mistake.
  - 20 pts — Immediate acknowledgment without excuses; genuine apology in first reply.
  - 15 pts — Acknowledges within first 2–3 responses, mild excuse but still apologetic.
  - 10 pts — Delayed acknowledgment, excuses dominate, apology feels secondary.
  - 5 pts — Acknowledges but shifts blame or minimizes importance.
  - 0 pts — Denies, avoids, or dismisses entirely.
  
  2. Empathy & Emotional Understanding (20 Points)
  Measures how well they recognize the emotional impact.
  - 20 pts — Explicitly validates feelings (“I understand why you’re hurt, it’s important to me too”).
  - 15 pts — Shows partial empathy but focuses on facts more than emotions.
  - 10 pts — General “sorry” without exploring feelings.
  - 5 pts — Shows impatience or tries to brush it off.
  - 0 pts — No empathy at all.
  
  3. Accountability (15 Points)
  Measures willingness to own up without shifting blame.
  - 15 pts — Full ownership, no excuses, uses “I” statements (“I messed up…”).
  - 10 pts — Mostly owns up but adds mild external excuses.
  - 5 pts — Blames circumstances heavily.
  - 0 pts — Denies fault entirely.
  
  4. Problem-Solving & Redemption Effort (20 Points)
  Measures effort to make it right and prevent future mistakes.
  - 20 pts — Offers thoughtful plan or meaningful gesture to make amends, proactive ideas.
  - 15 pts — Offers small gesture or plan but lacks personalization.
  - 10 pts — Generic “I’ll make it up to you” without specifics.
  - 5 pts — Minimal or reluctant effort.
  - 0 pts — No attempt to make it up.
  
  5. Communication Style & Tone (15 Points)
  Measures warmth, respect, and ability to de-escalate.
  - 15 pts — Warm, patient, respectful, and calm throughout.
  - 10 pts — Mostly respectful but a bit defensive at moments.
  - 5 pts — Tone fluctuates between defensive and caring.
  - 0 pts — Hostile, dismissive, or sarcastic.
  
  6. Closing Emotional Resolution (10 Points)
  Measures how the conversation ends emotionally.
  - 10 pts — Ends with emotional repair, mutual understanding.
  - 8 pts — Ends somewhat repaired, but with lingering tension.
  - 5 pts — Ends unresolved or cold.
  - 0 pts — Ends in hostility or total breakdown.
  
  Point Interpretation:
  - 90–100 pts: Excellent — fully empathetic, accountable, and proactive.
  - 75–89 pts: Good — some rough edges but mostly handled well.
  - 50–74 pts: Mediocre — attempted but lacked depth or consistency.
  - Below 50 pts: Poor — failed to acknowledge, empathize, or repair.`,
    },
    {
      title: "Lost Luggage",
      description: "You've just landed and your luggage is missing. Work with the airline staff to provide a clear and detailed description of your bag to help them find it.",
      narrationAudioUrl: "https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbcz1aTa4Lsb2ywrJUuNxVvkTMOAR4qHeFnthpK",
      questCardImageUrl: "https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbcCjl6hIiuwZMHPvml935CToS0cROhDY8gqeBf",
      assistantId: "10a36fd6-7031-49da-8e5d-fc5961edf9ae",
      scoringAlgorithmPrompt: `Passenger who lost their bag
  Max Score: 100 points
  
  1. Clarity of Initial Report (20 pts)
  - Clearly states when the bag was last seen → 5 pts
  - Clearly states where it was last seen → 5 pts
  - Provides a quick, relevant description without unrelated details → 10 pts
  
  2. Quality of Description (20 pts)
  - Provides color, size, brand, or tags → 5 pts
  - Lists distinctive features or markings → 5 pts
  - Mentions important contents that can help identify the bag → 10 pts
  
  3. Responsiveness & Cooperation (20 pts)
  - Answers staff questions promptly and directly → 10 pts
  - Follows the step-by-step process without jumping ahead or withholding info → 10 pts
  
  4. Accuracy & Consistency (20 pts)
  - Details match throughout the conversation (no contradictions) → 10 pts
  - Provides information confidently without frequent “I don’t know” → 10 pts
  
  5. Engagement & Effort (20 pts)
  - Shows patience and cooperation throughout the process → 5 pts
  - Actively offers additional useful details without being prompted → 10 pts
  - Completes any requested forms or steps promptly → 5 pts
  
  Scoring Guide
  - 90–100: Excellent — fully cooperative, clear, and helpful.
  - 75–89: Good — mostly clear, minor improvements possible.
  - 60–74: Fair — provides some helpful info, but lacks clarity or cooperation in parts.
  - Below 60: Poor — vague, inconsistent, or uncooperative, slowing down the search.`,
    },
    {
      title: "Veg Customer",
      description: "You are a waiter who has just served a non-vegetarian dish to a vegetarian customer. Your goal is to apologize, explain the mistake, and resolve the issue professionally and with empathy.",
      narrationAudioUrl: "https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbcIqw4GDAp8OqcZ1oyFs3CfhJiWRlg2TDjXMQU",
      questCardImageUrl: "https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbc5g6PtNH4lEs4ZRxXh8W23ObfzyapBmQoj6Aw",
      assistantId: "ef9eb4ea-a942-4738-84e6-8ffb1a217b8c",
      scoringAlgorithmPrompt: `Waiter Skills Evaluation — 100 Point Scale
  1. Initial Reaction & Acknowledgment — 15 points
  - How quickly and sincerely the waiter recognizes the complaint.
  - 0–5 → Delayed, defensive, or ignores the complaint.
  - 6–10 → Acknowledges but without genuine empathy.
  - 11–15 → Immediate acknowledgment with visible concern and apology.
  
  2. Empathy & Apology — 20 points
  - Ability to express sincere regret and connect emotionally with the customer.
  - 0–7 → Apology is absent, robotic, or dismissive.
  - 8–14 → Basic apology without depth.
  - 15–20 → Heartfelt apology that addresses the seriousness of serving non-veg to a vegetarian, with respectful tone.
  
  3. Explanation & Transparency — 15 points
  - Clarity and honesty in explaining how the mistake happened.
  - 0–5 → Avoids explanation or blames others.
  - 6–10 → Gives partial explanation, lacks detail.
  - 11–15 → Provides a clear, truthful explanation without making excuses.
  
  4. Problem-Solving & Corrective Action — 20 points
  - Steps taken to resolve the issue promptly.
  - 0–7 → Minimal or no action to fix the mistake.
  - 8–14 → Offers a replacement but without urgency or additional solutions.
  - 15–20 → Immediately offers a proper replacement meal, ensures no further error, and coordinates with kitchen efficiently.
  
  5. Compensation Handling — 10 points
  - How well the waiter offers and negotiates appropriate compensation.
  - 0–3 → No compensation or dismisses the request.
  - 4–7 → Offers something small without acknowledging impact.
  - 8–10 → Suggests fair, customer-focused compensation (e.g., discount, free meal).
  
  6. Communication Style & De-escalation — 20 points
  - Skill in keeping the situation calm and restoring trust.
  - 0–7 → Argumentative, defensive, or emotionally detached.
  - 8–14 → Tries to calm but with mixed success.
  - 15–20 → Consistently calm, respectful, and uses active listening to reduce tension.
  
  Total: 100 Points
  - 0–40 → Poor service recovery
  - 41–70 → Adequate but needs improvement
  - 71–85 → Skilled in customer handling
  - 86–100 → Exceptional recovery and customer trust restoration`,
    },
    {
      title: "HR Interview",
      description: "You are a candidate for a new role. Impress the HR interviewer by demonstrating your skills, experience, and professionalism.",
      narrationAudioUrl: "https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbchu8iZ1osWyQqx6l9Vf8iLceG0O5wzgUKSbIA",
      questCardImageUrl: "https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbc9iYGtPW2zauULtyN374irWKMGVH5eDc1bJFC",
      assistantId: "568c483f-2756-4355-bded-04e59abfd3b2",
      scoringAlgorithmPrompt: `Candidate Evaluation Metric – HR Interview Scenario (Total: 100 points)
  1. Communication Skills (20 points)
  - 0–7 pts: Responses unclear, disorganized, or too brief; overuse of filler words.
  - 8–14 pts: Communicates adequately but with occasional rambling or vague points.
  - 15–20 pts: Clear, concise, well-structured answers with confident delivery.
  
  2. Relevant Experience & Qualifications (25 points)
  - 10 pts: Limited or unrelated experience; unable to provide concrete examples.
  - 11–18 pts: Some relevant experience but lacking depth or clear alignment with the role.
  - 19–25 pts: Strong, directly relevant experience with specific, measurable examples.
  
  3. Problem-Solving & Critical Thinking (15 points)
  - 0–5 pts: Struggles to analyze situations or answer situational questions logically.
  - 6–10 pts: Offers reasonable but generic solutions without much depth.
  - 11–15 pts: Provides creative, well-reasoned solutions with clear thought process.
  
  4. Cultural Fit & Professionalism (15 points)
  - 0–5 pts: Displays poor attitude, disrespect, or disinterest.
  - 6–10 pts: Neutral attitude; polite but not especially engaging.
  - 11–15 pts: Demonstrates enthusiasm, alignment with company values, and respect for the process.
  
  5. Preparedness & Research (10 points)
  - 0–3 pts: No apparent knowledge of the company or role.
  - 4–7 pts: Basic understanding of the role/company but lacks depth.
  - 8–10 pts: Well-prepared with strong knowledge of the company, role, and industry trends.
  
  6. Engagement & Curiosity (15 points)
  - 0–5 pts: Asks no questions or only generic ones.
  - 6–10 pts: Asks some relevant questions but lacks depth or insight.
  - 11–15 pts: Asks thoughtful, insightful questions that show genuine interest in the role and organization.
  
  Scoring Interpretation & Candidate Feedback
  - 90–100 (Outstanding)
    - Feedback: Exceptional performance. Maintain your strong communication, depth of experience, and thoughtful engagement. Continue building on your industry knowledge to stay competitive.
  - 75–89 (Strong)
    - Feedback: Solid overall. Work on refining your answers with more specific, measurable examples. Improve depth in either problem-solving or company knowledge to reach the next level.
  - 60–74 (Average)
    - Feedback: You have potential, but need to focus on clear communication, stronger preparation, and demonstrating how your experience directly matches the role. Practice with mock interviews to boost confidence.
  - Below 60 (Needs Improvement)
    - Feedback: Significant development needed in multiple areas. Strengthen your research, practice structured answers (STAR method), and work on presenting yourself confidently and professionally.`,
    },
  ];