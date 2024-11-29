import LoadingSpinner from "@/components/common/LoadingSpinner";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoadingSpinner size={80} />
    </div>
  );
};
export default Loading;
