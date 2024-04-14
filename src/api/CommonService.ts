import HttpClient from '@/api/HttpClient';
import Config from '@/config';

const defaultAPI = Config.backend;

// 메일을 보내는 메서드
const contact = async (body: Record<string, any>): Promise<any> => {
  return await HttpClient.post(`${defaultAPI}/common/sendMail`, body);
}

// 블로그 목록을 가져오는 메서드
const getBlogList = async (): Promise<any> => {
  return await HttpClient.get(`${defaultAPI}/common/blogList`);
}

// 배지 목록을 가져오는 메서드
const getBadgeList = async (): Promise<any> => {
  return await HttpClient.get(`${defaultAPI}/common/badgeList`);
}

export { getBadgeList, getBlogList, contact };