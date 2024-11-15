import React, { useEffect } from "react";
import { Button, Row } from "antd";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  // Handle left and right arrow key presses
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else if (event.key === "ArrowRight" && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  useEffect(() => {
    // Add keydown event listener on component mount
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, totalPages]);
  return (
    <Row justify="space-evenly" style={{ minWidth: "100%" }}>
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
        color="danger"
        variant="solid"
        size="large"
        style={{ padding: "0rem 4rem" }}
      >
        PREVIOUS
      </Button>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        color="danger"
        variant="solid"
        size="large"
        style={{ padding: "0rem 4rem" }}
      >
        NEXT
      </Button>
    </Row>
  );
};

export default CustomPagination;
