import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Course } from '@/dto/course.dto';

export const useCourseStore = defineStore('course', () => {
  const course = ref<Course | null>(null);

  function setCourse(item: Course): void {
    course.value = item;
  }

  return { course, setCourse };
});
