import { ref } from 'vue'
import PageContent from '@/components/page-content'
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handlesearchEvent = (queryInfo: any) => {
    // console.log(pageContentRef)
    pageContentRef.value?.getPageData(queryInfo)
  }
  const handleResetEvent = () => {
    pageContentRef.value?.getPageData()
  }
  return [pageContentRef, handleResetEvent, handlesearchEvent]
}
