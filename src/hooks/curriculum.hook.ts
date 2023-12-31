import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CurriculumRepository } from "../services/curriculum.repository";
import { useCallback, useMemo } from "react";
import {
  createCurriculumAsync,
  deleteCurriculumAsync,
  getAllCurriculumsAsync,
  modifyCurriculumAsync,
} from "../redux/thunks";
import { Curriculum } from "../models/curriculum";

export function useCurriculums() {
  const { curriculums, currentUser } = useSelector(
    (state: RootState) => state.curriculum
  );
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const url = "http://localhost:6969/curriculum";

  const repo: CurriculumRepository = useMemo(
    () => new CurriculumRepository(url, token as string),
    [token]
  );

  const handleLoadCurriculums = useCallback(async () => {
    await dispatch(getAllCurriculumsAsync(repo));
  }, [dispatch, repo]);

  const handleCreateCurriculums = async (curriculum: FormData) => {
    await dispatch(createCurriculumAsync({ repo, curriculum }));
  };

  const handleDeleteCurriculum = async (id: Curriculum["id"]) => {
    await dispatch(deleteCurriculumAsync({ repo, id }));
  };

  const handleModifyCurriculums = async (
    id: Curriculum["id"],
    curriculum: Partial<Curriculum>
  ) => {
    await dispatch(modifyCurriculumAsync({ repo, id, curriculum }));
  };

  return {
    curriculums,
    currentUser,
    url,
    handleCreateCurriculums,
    handleLoadCurriculums,
    handleDeleteCurriculum,
    handleModifyCurriculums,
  };
}
