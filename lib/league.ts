export type Submission = {id:string;school:string;region:string;captain:string;challenge:string;views:number;completion:number;facultyVerified:boolean;consentComplete:boolean;status:"ready"|"hold"};
export function sponsorScore(s: Submission): number {
  if (!s.facultyVerified || !s.consentComplete) return 0;
  return Math.round(Math.min(s.views / 25, 60) + Math.min(s.completion * 0.4, 40));
}
export function rankSubmissions(items: Submission[]) {
  return [...items].sort((a,b) => sponsorScore(b) - sponsorScore(a));
}
export function eligibility(s: Pick<Submission,"facultyVerified"|"consentComplete">) {
  if (!s.facultyVerified) return "Faculty verification required";
  if (!s.consentComplete) return "Guardian consent incomplete";
  return "Sponsor-ready";
}
