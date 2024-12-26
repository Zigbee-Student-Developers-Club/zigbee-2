import LoadingSpinner from "@/components/common/LoadingSpinner";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner size={80} />
    </div>
  );
};
export default Loading;
