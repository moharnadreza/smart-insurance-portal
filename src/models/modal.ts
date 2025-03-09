import { create } from "zustand";

type State = {
  isOpen: boolean;
  activeFormId: string | undefined;
  open: ({ id }: { id: string }) => void;
  close: () => void;
};

const useModal = create<State>()((set) => ({
  isOpen: false,
  activeFormId: undefined,
  open: ({ id }) => set(() => ({ isOpen: true, activeFormId: id })),
  close: () => set(() => ({ isOpen: false, activeFormId: undefined })),
}));

export { useModal };
